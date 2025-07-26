import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("PRAISE");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = {
      name,
      category,
      message,
    };

    try {
      const response = await fetch("https://feedback-collector-system.onrender.com/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      setName("");
      setMessage("");
      setCategory("PRAISE");
      onFeedbackSubmitted();
    } catch (error) {
      alert("Submission failed.");
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />

      <label>Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="PRAISE">Praise</option>
        <option value="BUG">Bug</option>
        <option value="FEATURE_REQUEST">Feature Request</option>
        <option value="COMPLAINT">Complaint</option>
        <option value="OTHER">Other</option>
      </select>

      <label>Message:</label>
      <textarea
        rows={5}
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
