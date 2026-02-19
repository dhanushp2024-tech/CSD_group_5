package com.genbridge.backend.services;

import com.genbridge.backend.dto.ContentRequest;
import com.genbridge.backend.entity.Content;
import com.genbridge.backend.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    public Content saveDraft(ContentRequest request, UUID contributorId) {
        Content content = new Content();
        content.setTitle(request.getTitle());
        content.setDescription(request.getDescription());
        content.setTerm(request.getTerm());
        content.setContributorId(contributorId);
        content.setStatus("DRAFT");
        return contentRepository.save(content);
    }

    public Content submitForReview(ContentRequest request, UUID contributorId) {
        Content content = new Content();
        content.setTitle(request.getTitle());
        content.setDescription(request.getDescription());
        content.setTerm(request.getTerm());
        content.setContributorId(contributorId);
        content.setStatus("PENDING");
        return contentRepository.save(content);
    }

    public List<Content> getApprovedContent() {
        return contentRepository.findByStatus("APPROVED");
    }
}
