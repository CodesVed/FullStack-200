package com.example.FeedbackCollectorSystem.repo;

import com.example.FeedbackCollectorSystem.model.Category;
import com.example.FeedbackCollectorSystem.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

    public List<Feedback> findByCategory(Category category);
}
