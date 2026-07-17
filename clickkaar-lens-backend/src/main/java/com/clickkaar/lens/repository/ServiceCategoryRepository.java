package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.ServiceCategory;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {
  Optional<ServiceCategory> findBySlugAndActiveTrue(String slug);
}
