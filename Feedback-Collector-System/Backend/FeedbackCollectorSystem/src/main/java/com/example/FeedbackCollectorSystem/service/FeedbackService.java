package com.example.FeedbackCollectorSystem.service;

import com.example.FeedbackCollectorSystem.model.Category;
import com.example.FeedbackCollectorSystem.model.Feedback;
import com.example.FeedbackCollectorSystem.repo.FeedbackRepo;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    private FeedbackRepo repo;

    public FeedbackService(FeedbackRepo repo) {
        this.repo = repo;
    }

    public Feedback submitFeedback(Feedback feedback){
        return repo.save(feedback);
    }

    public List<Feedback> getFeedbacks(){
        return repo.findAll(Sort.by(Sort.Direction.DESC, "submittedAt"));
    }

    public Feedback getFeedbackById(Long id){
        return repo.findById(id).orElse(null);
    }

    public List<Feedback> findByCategory(Category category){
        return repo.findByCategory(category);
    }

    public void deleteFeedback(Long id){
        if (repo.existsById(id)) {
            repo.deleteById(id);
        }
    }
}
