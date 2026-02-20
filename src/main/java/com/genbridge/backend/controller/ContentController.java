package com.genbridge.backend.controller;

import com.genbridge.backend.dto.ContentRequest;
import com.genbridge.backend.dto.RejectRequest;
import com.genbridge.backend.entity.Content;
import com.genbridge.backend.services.ContentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    // Learner submits a draft
    @PostMapping("/draft")
    public ResponseEntity<Map<String, String>> saveDraft(
            @Valid @RequestBody ContentRequest request,
            @RequestParam UUID contributorId) {
        contentService.saveDraft(request, contributorId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Saved to draft successfully");
        return ResponseEntity.ok(response);
    }

    // Learner submits for review => PENDING
    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitForReview(
            @Valid @RequestBody ContentRequest request,
            @RequestParam UUID contributorId) {
        contentService.submitForReview(request, contributorId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Content submitted for review");
        return ResponseEntity.ok(response);
    }

    // Learner view approved list
    @GetMapping("/approved")
    public ResponseEntity<List<Content>> getApprovedContent() {
        return ResponseEntity.ok(contentService.getApprovedContent());
    }

    // Learner view approved details by id (404 if not approved)
    @GetMapping("/{id}")
    public ResponseEntity<Content> getApprovedContentById(@PathVariable UUID id) {
        Content content = contentService.getApprovedContentById(id);
        if (content == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(content);
    }

    // Admin view pending queue
    @GetMapping("/pending")
    public ResponseEntity<List<Content>> getPendingContent() {
        return ResponseEntity.ok(contentService.getPendingContent());
    }

    // Admin approve
    @PutMapping("/{id}/approve")
    public ResponseEntity<Map<String, String>> approveContent(
            @PathVariable UUID id,
            Authentication authentication) {
        String adminEmail = (authentication != null) ? String.valueOf(authentication.getPrincipal()) : null;
        contentService.approveContent(id, adminEmail);

        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Content approved successfully");
        return ResponseEntity.ok(response);
    }

    // Admin reject (reason required)
    @PutMapping("/{id}/reject")
    public ResponseEntity<Map<String, String>> rejectContent(
            @PathVariable UUID id,
            @Valid @RequestBody RejectRequest rejectRequest,
            Authentication authentication) {
        String adminEmail = (authentication != null) ? String.valueOf(authentication.getPrincipal()) : null;
        contentService.rejectContent(id, adminEmail, rejectRequest);

        Map<String, String> response = new HashMap<>();
        response.put("message", "❌ Content rejected");
        return ResponseEntity.ok(response);
    }
}