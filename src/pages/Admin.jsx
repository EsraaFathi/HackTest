import React, { useState } from "react";

function Admin() {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [sqlInput, setSqlInput] = useState("");
  const [xssMessage, setXssMessage] = useState("");
  const [idorMessage, setIdorMessage] = useState("");
  const [sqlMessage, setSqlMessage] = useState("");

  // XSS Vulnerable Comment Submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setXssMessage(comment); // Update to use setXssMessage
  };

  // Handle File Upload (Insecure)
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/upload", { method: "POST", body: formData });
    alert("File uploaded!");
  };

  // Handle IDOR (Insecure Direct Object Reference)
  const handleProfileView = async (e) => {
    e.preventDefault();
    const response = await fetch(`/profile?userId=${userId}`);
    const data = await response.text();
    setIdorMessage(data); // Update to use setIdorMessage
  };

  // Simulate SQL Injection
  const handleSqlQuery = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `/sql-query?input=${encodeURIComponent(sqlInput)}`
    );
    const data = await response.text();
    setSqlMessage(data); // Update to use setSqlMessage
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      {/* XSS Vulnerability */}
      <section className="my-5">
        <h3>Cross-Site Scripting (XSS)</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comment"
          />
          <button className="btn btn-warning" type="submit">
            Submit
          </button>
        </form>
        <div dangerouslySetInnerHTML={{ __html: xssMessage }} />
      </section>

      {/* Insecure File Upload */}
      <section className="my-5">
        <h3>Insecure File Upload</h3>
        <form onSubmit={handleFileUpload}>
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="btn btn-danger" type="submit">
            Upload
          </button>
        </form>
      </section>

      {/* IDOR */}
      <section className="my-5">
        <h3>Insecure Direct Object Reference (IDOR)</h3>
        <form onSubmit={handleProfileView}>
          <input
            type="text"
            className="form-control mb-3"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
          <button className="btn btn-info" type="submit">
            View Profile
          </button>
        </form>
        <div>{idorMessage}</div>
      </section>

      {/* SQL Injection Vulnerability */}
      <section className="my-5">
        <h3>SQL Injection</h3>
        <form onSubmit={handleSqlQuery}>
          <input
            type="text"
            className="form-control mb-3"
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="Enter SQL query input"
          />
          <button className="btn btn-success" type="submit">
            Run Query
          </button>
        </form>
        <div>{sqlMessage}</div>
      </section>
    </div>
  );
}

export default Admin;
