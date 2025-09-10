import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const questionText = `2. 11 is prime, 111 is not prime. We use the notation 1N to mean N ones. 
For example, 1_7 = 1111111. 
If N is prime, 1N might be prime. If N is not prime, 1N cannot be prime. 
Determine the repunit primes for N between 2 and 1040.`;

  const pythonCode = `
from sympy import isprime, primerange

def repunit(n):
    """Return the number consisting of n ones."""
    return int("1" * n)

repunit_primes = []
for n in primerange(2, 1041):
    Rn = repunit(n)
    if isprime(Rn):
        repunit_primes.append((n, Rn))

for n, Rn in repunit_primes:
    print(f"1_{n} = {Rn}")
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  const runCode = () => {
    setData(null);
    setLoading(true);

    axios
      .get("http://127.0.0.1:5000/api/q2")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q2 data");
        setLoading(false);
      });
  };

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#d1f3e0",
    color: "#000",
    padding: "20px",
    boxSizing: "border-box",
  };

  const contentStyle = { display: "flex", flex: 1, gap: "20px" };

  const codeStyle = {
    flex: 1,
    backgroundColor: "#b4eab1ff",
    padding: "20px",
    borderRadius: "12px",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#d1f3e0",
    border: "1px solid #c2e9d2",
    borderRadius: "12px",
    padding: "20px",
    fontFamily: "monospace",
    maxHeight: "400px",
    overflowY: "auto",
    wordBreak: "break-all",
    display: "flex",
    flexDirection: "column",
  };

  const navButtonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#90ebabff",
    color: "#100202ff",
  };

  return (
    <div style={pageStyle}>
      <h1>Question 2</h1>

      <div
        style={{
          backgroundColor: "#90ebabff",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <p>{questionText}</p>
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

          {/* Run Code Button under the code */}
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
          ) : data ? (
            <>
              {data.repunit_primes.map((item) => (
                <p key={item.n}>
                  1<sub>{item.n}</sub> ={" "}
                  {item.repunit.length > 60
                    ? `${item.repunit.slice(0, 30)}...${item.repunit.slice(-30)}`
                    : item.repunit}
                </p>
              ))}
              <p>Time taken: {data.runtime_seconds} seconds</p>
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
          <button style={navButtonStyle} onClick={() => navigate("/")}>
            Home
          </button>
          <button style={navButtonStyle} onClick={() => navigate("/q1")}>
            ← Previous
          </button>
        </div>
        <button style={navButtonStyle} onClick={() => navigate("/q3")}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q2;
