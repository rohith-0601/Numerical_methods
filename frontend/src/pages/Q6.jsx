import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q6() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/q6")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q6 data");
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
  };

  const questionStyle = {
    backgroundColor: "#e6e6f5",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #d5d5ec",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#b3b3ff",
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
      <h1>Question 6</h1>

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
          ) : data?.perfect_numbers?.length > 0 ? (
            data.perfect_numbers.map((item, index) => (
              <p key={index}>
                Perfect Number for p={item.p}: {item.perfect_number}
              </p>
            ))
          ) : (
            <p>No perfect numbers found.</p>
          )}
          {!loading && <p>Time taken: {data?.runtime_seconds} seconds</p>}
        </div>
      </div>

      <div style={bottomButtons}>
        <button style={buttonStyle} onClick={() => navigate("/q5")}>
          ← Previous
        </button>
        <button style={buttonStyle} onClick={() => navigate("/q7")}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q6;
