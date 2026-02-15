package com.genbridge.backend.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Error response for validation or duplicate email")
public class ErrorResponse {
    @Schema(description = "Field with error", example = "password")
    public String field;

    @Schema(description = "Error message", example = "Password must be at least 8 characters")
    public String message;
}