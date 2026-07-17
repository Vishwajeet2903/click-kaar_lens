package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.OccasionCategory;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OccasionCategoryRepository extends JpaRepository<OccasionCategory, Long> {
  Optional<OccasionCategory> findBySlugAndActiveTrue(String slug);
}
