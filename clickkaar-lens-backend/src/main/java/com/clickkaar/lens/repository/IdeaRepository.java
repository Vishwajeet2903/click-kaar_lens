package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.Idea;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IdeaRepository extends JpaRepository<Idea, Long> {
  Optional<Idea> findBySlugAndActiveTrue(String slug);
  Page<Idea> findByActiveTrue(Pageable pageable);
}
