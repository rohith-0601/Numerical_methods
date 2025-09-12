import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q1() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [eventSource, setEventSource] = useState(null);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");

  const navigate = useNavigate();

  // Timer for loading
  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Cleanup EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  const runCode = () => {
    if (!rangeStart || !rangeEnd) {
      toast.error("Please enter both start and end values.");
      return;
    }
    if (rangeStart > rangeEnd) {
      toast.error("Start must be less than or equal to End.");
      return;
    }

    // Close existing EventSource if any
    if (eventSource) {
      eventSource.close();
    }

    setData(null);
    setTimeElapsed(0);
    setLoading(true);

    const source = new EventSource(
      `http://127.0.0.1:5000/api/q1/stream?start=${rangeStart}&end=${rangeEnd}`
    );
    setEventSource(source);

    source.onmessage = (e) => {
      const parsed = JSON.parse(e.data);

      if (parsed.found) {
        setData(parsed);
        setTimeElapsed(parsed.runtime_seconds);
        setLoading(false);
        source.close();
      } else if (parsed.current_n) {
        setTimeElapsed(parsed.runtime_seconds);
      } else if (parsed.message) {
        setData(parsed);
        setLoading(false);
        source.close();
      }
    };

    source.onerror = (err) => {
      console.error("EventSource failed:", err);
      setLoading(false);
      source.close();
      toast.error("Stream connection failed.");
    };
  };

  const pythonCode = `
import gmpy2
import sys
import time

sys.set_int_max_str_digits(20000)

def kaprekar_number(n: int) -> int:
    num = 0
    for i in range(1, n + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(n - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num
`;

  const questionText = `A prime number is generated using a Kaprekar pattern:
1 2 3 ... n (n-1) ... 3 2 1
Find the next number that follows this pattern.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  const navButtonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#c19a83ff",
    color: "#fff",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f7e0d3",
        padding: "20px",
      }}
    >
      <h1>Question 1</h1>

      <div
        style={{
          backgroundColor: "#c19a83ff",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <p>{questionText}</p>
      </div>

      <div style={{ display: "flex", gap: "20px", flex: 1 }}>
        {/* Code Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#ebe2d5ff",
            padding: "20px",
            borderRadius: "12px",
            overflowY: "auto",
            fontFamily: "monospace",
            position: "relative",
          }}
        >
          <button
            onClick={copyToClipboard}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#888",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Copy
          </button>
          <pre>{pythonCode}</pre>

          {/* Range Inputs */}
          <div
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <label>
              Start:
              <input
                type="number"
                value={rangeStart}
                onChange={(e) => setRangeStart(Number(e.target.value))}
                style={{ marginLeft: "5px", width: "80px" }}
              />
            </label>
            <label>
              End:
              <input
                type="number"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(Number(e.target.value))}
                style={{ marginLeft: "5px", width: "80px" }}
              />
            </label>
          </div>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={runCode} style={navButtonStyle}>
              Run Code
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#d4cacab0",
            padding: "20px",
            borderRadius: "12px",
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  marginBottom: "20px",
                  border: "6px solid #f3f3f3",
                  borderTop: "6px solid #FFA500",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p>Loading... {timeElapsed}s</p>
            </>
          ) : data ? (
            <>
              {data.kaprekar_number ? (
                <>
                  <p>✅ Output:</p>
                  <p>n = {data.n}</p>
                  <div
                    style={{
                      maxHeight: "250px",
                      overflowY: "auto",
                      backgroundColor: "#f0e5d3",
                      padding: "10px",
                      borderRadius: "8px",
                      wordBreak: "break-all",
                    }}
                  >
                    Kaprekar Number = {data.kaprekar_number}
                  </div>
                  <p>Time taken: {data.runtime_seconds} seconds</p>
                </>
              ) : (
                <p>❌ No Kaprekar prime found in this range.</p>
              )}
            </>
          ) : (
            <p>Click "Run Code" under the code to see the output</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/")} style={navButtonStyle}>
            Home
          </button>
          <button onClick={() => navigate("/")} style={navButtonStyle}>
            ← Previous
          </button>
        </div>
        <button onClick={() => navigate("/q2")} style={navButtonStyle}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

export default Q1;
