import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q5() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const questionText = `5. Find a palindromic prime number with at least 50 digits.`;

  const pythonCode = `
import gmpy2
from gmpy2 import mpz, is_prime

def generate_palindrome(length):
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half
    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]  # odd-length palindrome
        yield mpz(pal)

def find_palindromic_prime(min_digits=50):
    length = min_digits if min_digits % 2 == 1 else min_digits + 1
    while True:
        for pal in generate_palindrome(length):
            if is_prime(pal):
                return pal
        length += 2

pal_prime = find_palindromic_prime(50)
print(pal_prime)
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    toast.success("Code copied to clipboard!");
  };

  const runCode = () => {
    setData(null);
    setLoading(true);

    axios
      .get("http://127.0.0.1:5000/api/q5")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q5 data");
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
    backgroundColor: "#e0f2f7",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #d5e5f0",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#e0f2f7",
    border: "1px solid #d5e5f0",
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
    backgroundColor: "#d0f0fb",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #d5e5f0",
  };

  const navButtonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#a0d8ef",
    color: "#000",
  };

  return (
    <div style={pageStyle}>
      <h1>Question 5</h1>

      <div style={questionStyle}>
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
          ) : data?.palindromic_prime ? (
            <>
              <p>{data.palindromic_prime}</p>
              <p>Digits: {data.digits}</p>
              <p>Runtime: {data.runtime_seconds} seconds</p>
            </>
          ) : data ? (
            <p>{data?.message || "No data found."}</p>
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
          <button style={navButtonStyle} onClick={() => navigate("/q4")}>
            ← Previous
          </button>
        </div>
        <button style={navButtonStyle} onClick={() => navigate("/q6")}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q5;
