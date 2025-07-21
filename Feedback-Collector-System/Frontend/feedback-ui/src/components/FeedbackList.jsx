import React from "react";
import "./FeedbackList.css";

const categoryColors = {
  PRAISE: "#4CAF50",
  BUG: "#f44336",
  FEATURE_REQUEST: "#2196F3",
  COMPLAINT: "#ff9800",
  OTHER: "#9e9e9e",
};

const FeedbackList = ({ feedbacks, onDelete }) => {
  return (
    <div className="feedback-list">
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} className="feedback-card">
            <span className="delete-button" onClick={() => onDelete(fb.id)}>
              ❌
            </span>
            <p>
              <strong>Name:</strong> {fb.name}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              <span
                style={{
                  backgroundColor: categoryColors[fb.category],
                  color: "white",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                }}
              >
                {fb.category}
              </span>
            </p>
            <p>
              <strong>Message:</strong> {fb.message}
            </p>
            <p style={{ fontSize: "0.85rem", color: "gray" }}>
              Submitted at: {fb.submittedAt}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
