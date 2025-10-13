import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feedback.css";


const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [file, setFile] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  // Fetch existing feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feedbacks");
      if (res.data.success) {
        setFeedbackList(res.data.feedbacks);
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      alert("Please write some feedback before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("text", feedbackText);
    if (file) formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/feedback", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert(res.data.message);
        setFeedbackText("");
        setFile(null);
        fetchFeedbacks(); // Refresh feedback list
      } else {
        alert(res.data.message || "Error saving feedback.");
      }
    } catch (err) {
      console.error("Server Error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <header>
        <div className="logo">Prepare<span>.com</span></div>
        <nav>
          <a href="/dashboard">My Account</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      <section className="feedback-section">
        <h2>FEEDBACK</h2>
        <div className="feedback-box">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="SHARE YOUR EXPERIENCE WITH US....."
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: "10px" }}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </section>

      <section className="feedback-list">
        <h3>Submitted Feedbacks</h3>
        {feedbackList.length === 0 && <p>No feedbacks yet.</p>}
        <ul>
          {feedbackList.map((fb) => (
            <li key={fb._id}>
              <strong>{fb.text}</strong>
              {fb.fileName && (
                <span>
                  {" "} - <a href={`https://www.dropbox.com/home${fb.dropboxPath}`} target="_blank" rel="noreferrer">{fb.fileName}</a>
                </span>
              )}
              <br />
              <small>{new Date(fb.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <div className="footer-left">
          <strong>Prepare.com</strong><br />
          AI based mock interview<br />
          Upskill your skills with us
        </div>
        <div className="footer-center">
          Contact us:
          <span className="icon">📷</span> Instagram
          <span className="icon">✖️</span> Twitter
          <span className="icon">📘</span> Facebook
          <br />
          © 2025 | All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Feedback;
