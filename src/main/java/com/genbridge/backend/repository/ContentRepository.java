package com.genbridge.backend.repository;

import com.genbridge.backend.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, UUID> {
    List<Content> findByStatus(String status);

    List<Content> findByContributor_Id(UUID contributorId);

    Optional<Content> findByIdAndStatus(UUID id, String status);
}
