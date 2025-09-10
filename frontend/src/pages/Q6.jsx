import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q6() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pValues, setPValues] = useState("2203,2281"); // default input

  const navigate = useNavigate();

  const questionText = `6. Using the Mersenne primes obtained in Q3, compute the corresponding perfect numbers 
using the formula N = 2^(p-1) * (2^p - 1) and verify their correctness.`;

  const pythonCode = `
def perfect_number_from_mersenne(p, M_p):
    N = (1 << (p - 1)) * M_p
    sigma_part1 = (1 << p) - 1
    sigma_part2 = 1 + M_p
    sigma_val = sigma_part1 * sigma_part2
    print(N, sigma_val, 2*N)
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  const runCode = () => {
    setData(null);
    setLoading(true);

    // Send p values as query parameter
    axios
      .get(`http://127.0.0.1:5000/api/q6?p_values=${encodeURIComponent(pValues)}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q6 data");
        setLoading(false);
      });
  };

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#ffffff",
    color: "#000",
    padding: "20px",
    boxSizing: "border-box",
  };

  const contentStyle = { display: "flex", flex: 1, gap: "20px" };

  const codeStyle = {
    flex: 1,
    backgroundColor: "#e6e6f5",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #d5d5ec",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#f0f0ff",
    border: "1px solid #d5d5ec",
    borderRadius: "12px",
    padding: "20px",
    fontFamily: "monospace",
    maxHeight: "400px",
    overflowY: "auto",
    wordBreak: "break-word",
    display: "flex",
    flexDirection: "column",
  };

  const questionStyle = {
    backgroundColor: "#e6e6f5",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #d5d5ec",
  };

  const navButtonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#b3b3ff",
    color: "#000",
  };

  return (
    <div style={pageStyle}>
      <h1>Question 6</h1>

      <div style={questionStyle}>
        <p>{questionText}</p>
        {/* Input for p values */}
        <input
          type="text"
          value={pValues}
          onChange={(e) => setPValues(e.target.value)}
          placeholder="Enter comma-separated p values, e.g., 2203,2281"
          style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #888", width: "100%", marginTop: "10px" }}
        />
      </div>

      <div style={contentStyle}>
        {/* Code Section */}
        <div style={codeStyle}>
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

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={runCode} style={navButtonStyle}>
              Run Code
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div style={outputStyle}>
          {loading ? (
            <p>Loading...</p>
          ) : data?.perfect_numbers?.length > 0 ? (
            data.perfect_numbers.map((item, index) => (
              <p key={index}>
                Perfect Number for p={item.p}: {item.perfect_number}
              </p>
            ))
          ) : data ? (
            <p>{data?.message || "No perfect numbers found."}</p>
          ) : (
            <p>Click "Run Code" under the code to see the output</p>
          )}
          {!loading && data?.runtime_seconds && (
            <p>Time taken: {data.runtime_seconds} seconds</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={navButtonStyle} onClick={() => navigate("/")}>
            Home
          </button>
          <button style={navButtonStyle} onClick={() => navigate("/q5")}>
            ← Previous
          </button>
        </div>
        <button style={navButtonStyle} onClick={() => navigate("/q7")}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q6;
