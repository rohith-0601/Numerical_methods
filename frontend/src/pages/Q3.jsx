import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Q3() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const questionText = `3. Find all Mersenne primes for p between 2201 and 2299. 
A Mersenne prime is of the form M_p = 2^p - 1, where p is prime and passes the Lucas-Lehmer test.`;

  const pythonCode = `
import gmpy2

def lucas_lehmer(p):
    if p == 2:
        return True
    M = gmpy2.mpz(2)**p - 1
    s = gmpy2.mpz(4)
    for _ in range(p - 2):
        s = (s * s - 2) % M
    return s == 0

for p in range(2201, 2300):
    if gmpy2.is_prime(p) and lucas_lehmer(p):
        M = gmpy2.mpz(2)**p - 1
        print(f"M_{p} = 2^{p} - 1 is a Mersenne prime!")
`;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/q3")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Q3 data");
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
    backgroundColor: "#fff0f8",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #f2d5ec",
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    position: "relative",
  };

  const outputStyle = {
    flex: 1,
    backgroundColor: "#ffeef6",
    border: "1px solid #f2d5ec",
    borderRadius: "12px",
    padding: "20px",
    fontFamily: "monospace",
    maxHeight: "400px",
    overflowY: "auto",
    wordBreak: "break-word",
  };

  const questionStyle = {
    backgroundColor: "#ffd6eb",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #f2d5ec",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#ffb6d1",
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
      <h1>Question 3</h1>

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
          ) : data?.mersenne_primes?.length > 0 ? (
            data.mersenne_primes.map((item, index) => (
              <p key={index}>
                M<sub>{item.p}</sub> = {item.mersenne_number}
              </p>
            ))
          ) : (
            <p>No Mersenne primes found.</p>
          )}
          {!loading && <p>Time taken: {data?.runtime_seconds} seconds</p>}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={buttonStyle} onClick={() => navigate("/")}>
            Home
          </button>
          <button style={buttonStyle} onClick={() => navigate("/q2")}>
            ← Previous
          </button>
        </div>
        <button style={buttonStyle} onClick={() => navigate("/q4")}>
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Q3;
