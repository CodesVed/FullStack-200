package com.example.FeedbackCollectorSystem.controller;

import com.example.FeedbackCollectorSystem.model.Category;
import com.example.FeedbackCollectorSystem.model.Feedback;
import com.example.FeedbackCollectorSystem.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class FeedbackController {
    private FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback){
        Feedback feedback1 = service.submitFeedback(feedback);
        return new ResponseEntity<>(feedback1, HttpStatus.CREATED);
    }

    @GetMapping("/view")
    public List<Feedback> getFeedbacks(@RequestParam(required = false) String category) {
        if (category == null) {
            return service.getFeedbacks();
        }

        try {
            Category enumCategory = Category.valueOf(category.toUpperCase());
            return service.findByCategory(enumCategory);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category value: " + category);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id){
        Feedback feedback = service.getFeedbackById(id);

        if (feedback != null){
            return new ResponseEntity<>(feedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long id){
        Feedback feedback = service.getFeedbackById(id);

        if (feedback != null){
            service.deleteFeedback(id);
            return new ResponseEntity<>("Feedback Removed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No such Feedback Found.", HttpStatus.NOT_FOUND);
        }
    }
}
