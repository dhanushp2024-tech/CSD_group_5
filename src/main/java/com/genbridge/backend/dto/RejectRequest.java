package com.genbridge.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class RejectRequest {

    @NotBlank(message = "Rejection reason is required")
    private String reason; // Inaccurate, Inappropriate, Poor Quality, Other

    private String comment; // optional

    public RejectRequest() {
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}