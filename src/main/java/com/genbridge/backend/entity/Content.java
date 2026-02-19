package com.genbridge.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "content")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String term;

    @Column(nullable = false)
    private UUID contributorId;

    @Column(nullable = false)
    private String status = "DRAFT"; // DRAFT, PENDING, APPROVED, REJECTED

    private LocalDateTime createdAt = LocalDateTime.now();

    public Content() {}

    public Content(String title, String description, String term, UUID contributorId) {
        this.title = title;
        this.description = description;
        this.term = term;
        this.contributorId = contributorId;
        this.status = "DRAFT";
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }
    public UUID getContributorId() { return contributorId; }
    public void setContributorId(UUID contributorId) { this.contributorId = contributorId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
