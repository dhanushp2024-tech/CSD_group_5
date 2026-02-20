package com.genbridge.backend.services;

import com.genbridge.backend.dto.ContentRequest;
import com.genbridge.backend.dto.RejectRequest;
import com.genbridge.backend.entity.Content;
import com.genbridge.backend.repository.ContentRepository;
import com.genbridge.backend.user.User;
import com.genbridge.backend.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ContentService {

    private final ContentRepository contentRepository;
    private final UserRepository userRepository;

    public ContentService(ContentRepository contentRepository, UserRepository userRepository) {
        this.contentRepository = contentRepository;
        this.userRepository = userRepository;
    }

    private User getUserOrThrow(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Content saveDraft(ContentRequest request, UUID contributorId) {
        User contributor = getUserOrThrow(contributorId);

        Content content = new Content();
        content.setTitle(request.getTitle());
        content.setDescription(request.getDescription());
        content.setTerm(request.getTerm());
        content.setContributor(contributor);
        content.setStatus("DRAFT");

        return contentRepository.save(content);
    }

    public Content submitForReview(ContentRequest request, UUID contributorId) {
        User contributor = getUserOrThrow(contributorId);

        Content content = new Content();
        content.setTitle(request.getTitle());
        content.setDescription(request.getDescription());
        content.setTerm(request.getTerm());
        content.setContributor(contributor);
        content.setStatus("PENDING");

        // clear old moderation fields if any
        content.setApprovedAt(null);
        content.setApprovedByEmail(null);
        content.setRejectedAt(null);
        content.setRejectedByEmail(null);
        content.setRejectionReason(null);
        content.setRejectionComment(null);

        return contentRepository.save(content);
    }

    // Learner view library
    public List<Content> getApprovedContent() {
        return contentRepository.findByStatus("APPROVED");
    }

    // Learner view details (ONLY approved)
    public Content getApprovedContentById(UUID id) {
        return contentRepository.findByIdAndStatus(id, "APPROVED").orElse(null);
    }

    // Admin review queue
    public List<Content> getPendingContent() {
        return contentRepository.findByStatus("PENDING");
    }

    // Admin approve
    public Content approveContent(UUID contentId, String adminEmail) {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        if (!"PENDING".equals(content.getStatus())) {
            throw new IllegalArgumentException("Only PENDING content can be approved.");
        }

        content.setStatus("APPROVED");
        content.setApprovedAt(LocalDateTime.now());
        content.setApprovedByEmail(adminEmail);

        // clear rejection fields
        content.setRejectedAt(null);
        content.setRejectedByEmail(null);
        content.setRejectionReason(null);
        content.setRejectionComment(null);

        return contentRepository.save(content);
    }

    // Admin reject with reason
    public Content rejectContent(UUID contentId, String adminEmail, RejectRequest rejectRequest) {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        if (!"PENDING".equals(content.getStatus())) {
            throw new IllegalArgumentException("Only PENDING content can be rejected.");
        }

        // reason is required (dropdown)
        String reason = rejectRequest.getReason();
        if (reason == null || reason.isBlank()) {
            throw new IllegalArgumentException("Rejection reason is required.");
        }

        content.setStatus("REJECTED");
        content.setRejectedAt(LocalDateTime.now());
        content.setRejectedByEmail(adminEmail);
        content.setRejectionReason(reason);
        content.setRejectionComment(rejectRequest.getComment());

        // clear approval fields
        content.setApprovedAt(null);
        content.setApprovedByEmail(null);

        return contentRepository.save(content);
    }
}