import React, { useState } from "react";

function App() {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  // Handle XSS Vulnerable Comment Submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setMessage(comment); // XSS vulnerability here
  };

  // Handle File Upload (Insecure)
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // Simulate file upload without validation
    await fetch("/upload", { method: "POST", body: formData });
    alert("File uploaded!");
  };

  // Handle IDOR (Insecure Direct Object Reference)
  const handleProfileView = async (e) => {
    e.preventDefault();
    const response = await fetch(`/profile?userId=${userId}`);
    const data = await response.text();
    setMessage(data); // Accessing other users' data without checks
  };

  return (
    <div>
      <h1>Vulnerable React App</h1>

      {/* XSS Vulnerability */}
      <h2>Leave a Comment (XSS)</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment"
        />
        <button type="submit">Submit</button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: message }} />

      {/* Insecure File Upload */}
      <h2>Upload a File</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {/* Insecure Direct Object Reference */}
      <h2>View User Profile</h2>
      <form onSubmit={handleProfileView}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button type="submit">View Profile</button>
      </form>
    </div>
  );
}

export default App;
