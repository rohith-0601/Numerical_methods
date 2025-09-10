import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q7() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [number1, setNumber1] = useState("10000000000000000000000000000000000000000000000012");
  const [number2, setNumber2] = useState("100000000000000000000000000000000000000000000000088");

  const navigate = useNavigate();

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

N1 = ${number1}
N2 = ${number2}
pair1 = goldbach_pair(N1)
pair2 = goldbach_pair(N2)
print(pair1, pair2)
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  const runCode = () => {
    setData(null);
    setLoading(true);
    axios
      .get("http://127.0.0.1:5000/api/q7", { params: { N1: number1, N2: number2 } })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q7 data");
        setLoading(false);
      });
  };

  const pageStyle = { display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#ffffff", color: "#000", padding: "20px", boxSizing: "border-box" };
  const contentStyle = { display: "flex", flex: 1, gap: "20px" };
  const codeStyle = { flex: 1, backgroundColor: "#fdf6e3", padding: "20px", borderRadius: "12px", border: "1px solid #e0d5c2", overflowY: "auto", fontFamily: "monospace", whiteSpace: "pre-wrap", position: "relative" };
  const outputStyle = { flex: 1, backgroundColor: "#f1ebd8", border: "1px solid #e0d5c2", borderRadius: "12px", padding: "20px", fontFamily: "monospace", maxHeight: "400px", overflowY: "auto", wordBreak: "break-word", display: "flex", flexDirection: "column" };
  const questionStyle = { backgroundColor: "#fdf6e3", padding: "15px", borderRadius: "12px", marginBottom: "20px", border: "1px solid #e0d5c2" };
  const navButtonStyle = { padding: "10px 20px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", backgroundColor: "#f5e6c7", color: "#000" };
  const inputStyle = { width: "100%", padding: "8px", marginTop: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" };

  return (
    <div style={pageStyle}>
      <h1>Question 7</h1>

      <div style={questionStyle}>
        <p>{questionText}</p>
        {/* Visible Input fields */}
        <input
          type="text"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          placeholder="Enter first even number"
          style={inputStyle}
        />
        <input
          type="text"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          placeholder="Enter second even number"
          style={inputStyle}
        />
      </div>

      <div style={contentStyle}>
        <div style={codeStyle}>
          <button
            onClick={copyToClipboard}
            style={{ position: "absolute", top: "10px", right: "10px", padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#888", color: "#fff", cursor: "pointer" }}
          >
            Copy
          </button>
          <pre>{pythonCode}</pre>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={runCode} style={navButtonStyle}>Run Code</button>
          </div>
        </div>

        <div style={outputStyle}>
          {loading ? (
            <p>Loading...</p>
          ) : data ? (
            <>
              <p>
                Goldbach for {number1}: ({data.pairs[0][0]}, {data.pairs[0][1]})
              </p>
              <p>
                Goldbach for {number2}: ({data.pairs[1][0]}, {data.pairs[1][1]})
              </p>
              {data.runtime_seconds && <p>Time taken: {data.runtime_seconds} seconds</p>}
            </>
          ) : (
            <p>Click "Run Code" under the code to see the output</p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={navButtonStyle} onClick={() => navigate("/")}>Home</button>
          <button style={navButtonStyle} onClick={() => navigate("/q6")}>← Previous</button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q7;
