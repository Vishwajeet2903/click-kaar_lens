package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.Blog;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Long> {
  Optional<Blog> findBySlugAndPublishedTrue(String slug);
  Page<Blog> findByPublishedTrue(Pageable pageable);
  List<Blog> findTop6ByPublishedTrueAndFeaturedTrueOrderByPublishedAtDesc();
}
