package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.BusinessCategory;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessCategoryRepository extends JpaRepository<BusinessCategory, Long> {
  Optional<BusinessCategory> findBySlugAndActiveTrue(String slug);
}
