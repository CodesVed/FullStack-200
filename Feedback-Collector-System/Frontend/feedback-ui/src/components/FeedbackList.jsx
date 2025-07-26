import React, { useState } from "react";
import "./FeedbackList.css";

const categoryColors = {
  PRAISE: "#4CAF50",
  BUG: "#f44336",
  FEATURE_REQUEST: "#2196F3",
  COMPLAINT: "#ff9800",
  OTHER: "#9e9e9e",
};

const FeedbackList = ({ feedbacks = [], onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (deletingId !== null) {
      console.log("Deletion already in progress for ID:", deletingId);
      return;
    }

    console.log("Attempting delete for ID:", id);
    setDeletingId(id);

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
      if (!confirmDelete) {
        console.log("User cancelled deletion");
        setDeletingId(null);
        return;
      }

      await onDelete(id);
      console.log("Successfully deleted:", id);
    } catch (err) {
      console.error("Error deleting feedback:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="feedback-list">
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} className="feedback-card">
            <button
              className="delete-button"
              onClick={() => handleDelete(fb.id)}
              disabled={deletingId === fb.id}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              title="Delete Feedback"
            >
              ❌
            </button>
            <p><strong>Name:</strong> {fb.name}</p>
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
            <p><strong>Message:</strong> {fb.message}</p>
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