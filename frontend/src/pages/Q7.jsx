import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Q7() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const questionText = `7. Goldbach's Conjecture (b): Every even number > 2 is the sum of two primes.
Here we test it for two 50+ digit even numbers.`;

  const pythonCode = `
from sympy import isprime, nextprime

def goldbach_pair(N: int):
    assert N % 2 == 0 and N > 2
    p = 2
    while p <= N // 2:
        q = N - p
        if isprime(p) and isprime(q):
            return p, q
        p = nextprime(p)
    return None

N1 = 10**49 + 12
N2 = 10**50 + 88
pair1 = goldbach_pair(N1)
pair2 = goldbach_pair(N2)
print(pair1, pair2)
`;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/q7")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q7 data");
        setLoading(false);
      });
  }, []);

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#ffffff",
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
    backgroundColor: "#fdf6e3",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e0d5c2",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#f1ebd8",
    border: "1px solid #e0d5c2",
    borderRadius: "12px",
    padding: "20px",
    fontFamily: "monospace",
    maxHeight: "400px",
    overflowY: "auto",
    wordBreak: "break-word",
  };

  const questionStyle = {
    backgroundColor: "#fdf6e3",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #e0d5c2",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#f5e6c7",
    color: "#000",
  };

  const bottomButtons = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div style={pageStyle}>
      <h1>Question 7</h1>

      <div style={questionStyle}>
        <p>{questionText}</p>
      </div>

      <div style={contentStyle}>
        <div style={codeStyle}>
          <button
            onClick={copyToClipboard}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Copy
          </button>
          <pre>{pythonCode}</pre>
        </div>

        <div style={outputStyle}>
          {loading ? (
            <p>Loading...</p>
          ) : data ? (
            <>
              <p>
                Goldbach for {data.numbers[0]}: ({data.pairs[0][0]}, {data.pairs[0][1]})
              </p>
              <p>
                Goldbach for {data.numbers[1]}: ({data.pairs[1][0]}, {data.pairs[1][1]})
              </p>
              <p>Time taken: {data.runtime_seconds} seconds</p>
            </>
          ) : (
            <p>No data found.</p>
          )}
        </div>
      </div>

      <div style={bottomButtons}>
        <button style={buttonStyle} onClick={() => window.history.back()}>
          ← Previous
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q7;
