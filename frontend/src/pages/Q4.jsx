import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q4() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

# Use the Mersenne primes from Q3
M_2203 = mpz(2) ** 2203 - 1
M_2281 = mpz(2) ** 2281 - 1

primes = first_primes_between_squares(M_2203, M_2281, count=4)
for p in primes:
    print(p)
`;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/q4")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q4 data");
        setLoading(false);
      });
  }, []);

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#d3d3f5", // purpleCard page background
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
    backgroundColor: "#bcbcff", // lighter purple
    padding: "20px",
    borderRadius: "12px",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#d3d3f5", // purpleCard background
    border: "1px solid #c8c8ec",
    borderRadius: "12px",
    padding: "20px",
    fontFamily: "monospace",
    maxHeight: "400px",
    overflowY: "auto",
    wordBreak: "break-all",
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
    backgroundColor: "#c8c8ec", // slightly lighter purple
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div style={pageStyle}>
      <h1>Question 4</h1>

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
            <p>Loading...</p>
          ) : (
            <>
              {data.primes?.map((prime, idx) => (
                <p key={idx}>{prime}</p>
              ))}
              {data.runtime_seconds && (
                <p>Time taken: {data.runtime_seconds} seconds</p>
              )}
            </>
          )}
        </div>
      </div>

      <div style={bottomButtons}>
        <button style={buttonStyle} onClick={() => navigate("/q3")}>
          ← Previous
        </button>
        <button style={buttonStyle} onClick={() => navigate("/q5")}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q4;
