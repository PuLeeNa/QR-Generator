"use client";

import { useState } from "react";
import axios from "axios";

// Add spinner animation to head
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  if (!document.querySelector("style[data-spinner]")) {
    style.setAttribute("data-spinner", "true");
    document.head.appendChild(style);
  }
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/generate-qr/?url=${url}`);
      setMessage(response.data.message);
      setQrCodeUrl(response.data.qr_code_url);
    } catch (error) {
      console.error("Error generating QR Code:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const downloadUrl = qrCodeUrl.replace("/upload/", "/upload/fl_attachment/");
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>QR Code Generator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL like https://example.com"
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      </form>
      <br />
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loading}>Generating QR Code...</p>
        </div>
      )}
      {message && <p>{message}</p>}
      {qrCodeUrl && (
        <>
          <img src={qrCodeUrl} alt="QR Code" style={styles.qrCode} />
          <br />
          <button onClick={handleDownload} style={styles.downloadButton}>
            Download QR Code
          </button>
        </>
      )}
      <br />
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    color: "white",
  },
  title: {
    margin: "0",
    lineHeight: "1.15",
    fontSize: "4rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    marginTop: "20px",
    width: "300px",
    color: "#121212",
  },
  button: {
    padding: "10px 20px",
    marginTop: "20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#0070f3",
    color: "white",
    cursor: "pointer",
  },
  qrCode: {
    marginTop: "20px",
  },
  downloadButton: {
    padding: "8px 16px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0, 112, 243, 0.3)",
    borderTop: "4px solid #0070f3",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loading: {
    color: "#0070f3",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "10px",
  },
};
