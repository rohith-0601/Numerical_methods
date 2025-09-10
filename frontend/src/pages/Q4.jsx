import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q4() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startP, setStartP] = useState("2203");
  const [endP, setEndP] = useState("2281");

  const navigate = useNavigate();

  const questionText = `4. Brocard's conjecture is the conjecture (open problem) that there are at least
four prime numbers between (pn)^2 and (pn+1)^2, where pn is the n-th prime number, for every n ≥ 2. 
Use the two Mersenne primes obtained in #3 and determine at least four prime numbers between the squares of those numbers.`;

  const pythonCode = `
import gmpy2
from gmpy2 import mpz, next_prime

def first_primes_between_squares(pn, pn1, count=4):
    low = mpz(pn) ** 2
    high = mpz(pn1) ** 2
    primes = []
    candidate = next_prime(low)
    while candidate < high and len(primes) < count:
        primes.append(candidate)
        candidate = next_prime(candidate)
    return primes

# Use the Mersenne primes from inputs
M_start = mpz(pn)
M_end = mpz(pn1)

primes = first_primes_between_squares(M_start, M_end, count=4)
for p in primes:
    print(p)
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  const runCode = () => {
    setData(null);
    setLoading(true);

    axios
      .get("http://127.0.0.1:5000/api/q4", {
        params: { startP: startP, endP: endP },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q4 data");
        setLoading(false);
      });
  };

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#d3d3f5",
    color: "#000",
    padding: "20px",
    boxSizing: "border-box",
  };

  const contentStyle = { display: "flex", flex: 1, gap: "20px" };

  const codeStyle = {
    flex: 1,
    backgroundColor: "#bcbcff",
    padding: "20px",
    borderRadius: "12px",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#d3d3f5",
    border: "1px solid #c8c8ec",
    borderRadius: "12px",
    padding: "20px",
    fontFamily: "monospace",
    maxHeight: "400px",
    overflowY: "auto",
    wordBreak: "break-all",
    display: "flex",
    flexDirection: "column",
  };

  const questionStyle = {
    backgroundColor: "#c8c8ec",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  };

  const navButtonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#8888ff",
    color: "#000",
  };

  return (
    <div style={pageStyle}>
      <h1>Question 4</h1>

      <div style={questionStyle}>
        <p>{questionText}</p>
      </div>

      {/* Input fields for start and end Mersenne primes */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Start Mersenne prime (pn):
          <input
            type="text"
            value={startP}
            onChange={(e) => setStartP(e.target.value)}
            style={{ marginLeft: "10px", width: "200px" }}
          />
        </label>
        <br />
        <label style={{ marginTop: "10px" }}>
          End Mersenne prime (pn+1):
          <input
            type="text"
            value={endP}
            onChange={(e) => setEndP(e.target.value)}
            style={{ marginLeft: "10px", width: "200px" }}
          />
        </label>
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

          {/* Run Code Button */}
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
          ) : data?.primes?.length > 0 ? (
            data.primes.map((prime, idx) => <p key={idx}>{prime}</p>)
          ) : data ? (
            <p>No primes found.</p>
          ) : (
            <p>Click "Run Code" under the code to see the output</p>
          )}

          {!loading && data?.runtime_seconds && (
            <p>Time taken: {data.runtime_seconds} seconds</p>
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
          <button style={navButtonStyle} onClick={() => navigate("/q3")}>
            ← Previous
          </button>
        </div>
        <button style={navButtonStyle} onClick={() => navigate("/q5")}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q4;
