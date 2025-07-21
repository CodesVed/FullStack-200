package com.example.FeedbackCollectorSystem.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = CategoryDeserializer.class)
public enum Category {
    BUG,
    FEATURE_REQUEST,
    PRAISE,
    COMPLAINT,
    OTHER
}
