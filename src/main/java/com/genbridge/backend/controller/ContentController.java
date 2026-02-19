package com.genbridge.backend.controller;

import com.genbridge.backend.dto.ContentRequest;
import com.genbridge.backend.entity.Content;
import com.genbridge.backend.services.ContentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @PostMapping("/draft")
    public ResponseEntity<Map<String, String>> saveDraft(
            @Valid @RequestBody ContentRequest request,
            @RequestParam UUID contributorId) {

        contentService.saveDraft(request, contributorId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Saved to draft successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitForReview(
            @Valid @RequestBody ContentRequest request,
            @RequestParam UUID contributorId) {

        contentService.submitForReview(request, contributorId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Content submitted for review");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Content>> getApprovedContent() {
        List<Content> approved = contentService.getApprovedContent();
        return ResponseEntity.ok(approved);
    }
}
