import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q1({ navigatePrev, navigateNext }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer for loading
  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Fetch Q1 data from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/q1")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Q1 data:", error);
        setLoading(false);
      });
  }, []);

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

start_time = time.time()
for n in range(1000, 3001):
    candidate = kaprekar_number(n)
    if gmpy2.is_prime(candidate):
        elapsed = time.time() - start_time
        print(f"n = {n}, Kaprekar number = {candidate}, runtime = {elapsed:.2f}s")
        break
`;

  const questionText = `A prime number is generated using a Kaprekar pattern:
1 2 3 ... n (n-1) ... 3 2 1
Find the next number that follows this pattern. That number n lies between 1000 and 3000.`;

  // Copy code to clipboard with toast
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  // Page styles
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f7e0d3",
    color: "#000",
    padding: "20px",
    boxSizing: "border-box",
  };

  const contentStyle = {
    display: "flex",
    flex: 1,
    gap: "20px",
  };

  const codeStyle = {
    flex: 1,
    backgroundColor: "#ebe2d5ff",
    padding: "20px",
    borderRadius: "12px",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#d4cacab0",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "monospace",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const bottomButtons = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const questionStyle = {
    backgroundColor: "#c19a83ff",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  };

  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <h1>Question 1</h1>
      <div style={questionStyle}>
        <p>{questionText}</p>
      </div>

      <div style={contentStyle}>
        {/* Code Section */}
        <div style={codeStyle}>
          <button
            onClick={copyToClipboard}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Copy
          </button>
          <pre>{pythonCode}</pre>
        </div>

        {/* Output Section */}
        <div style={outputStyle}>
          {loading ? (
            <>
              <div className="loader" style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    border: "6px solid #f3f3f3",
                    borderTop: "6px solid #FFA500",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
              <p>Loading... {timeElapsed}s</p>
            </>
          ) : (
            <>
              <p>✅ Output:</p>
              <p>n = {data.n}</p>
              <p>Kaprekar Number = {data.kaprekar_number}</p>
              <p>Time taken: {data.runtime_seconds} seconds</p>
            </>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={bottomButtons}>
        <button style={buttonStyle} onClick={()=>navigate('/')}>
          ← Previous
        </button>
        <button style={buttonStyle} onClick={()=>navigate('/q2')}>
          Next →
        </button>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* CSS spinner animation */}
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
