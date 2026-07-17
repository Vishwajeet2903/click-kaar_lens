package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.BlogCategory;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {
  Optional<BlogCategory> findBySlug(String slug);
}
