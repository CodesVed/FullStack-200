import React, { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import "./App.css";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchFeedbacks = async () => {
    try {
      const url =
        selectedCategory === "All"
          ? "https://feedback-collector-system.onrender.com/api/feedback/view"
          : `https://feedback-collector-system.onrender.com/api/feedback/view?category=${selectedCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to fetch feedbacks", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [selectedCategory]);

  const handleNewFeedback = () => {
    fetchFeedbacks(); // Refresh feedbacks after new submission
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://feedback-collector-system.onrender.com/api/feedback/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");

      fetchFeedbacks(); // Refresh after deletion
    } catch (error) {
      alert("Failed to delete feedback.");
    }
  };

  return (
    <div className="app-container">
      <h1>Feedback Collector</h1>
      <FeedbackForm onFeedbackSubmitted={handleNewFeedback} />

      <h2>Submitted Feedback</h2>
      <label>Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option>All</option>
        <option>BUG</option>
        <option>FEATURE_REQUEST</option>
        <option>PRAISE</option>
        <option>COMPLAINT</option>
        <option>OTHER</option>
      </select>

      <FeedbackList feedbacks={feedbacks} onDelete={handleDelete} />
    </div>
  );
}

export default App;
