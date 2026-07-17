package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.BlogTag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogTagRepository extends JpaRepository<BlogTag, Long> {
  Optional<BlogTag> findBySlug(String slug);
}
