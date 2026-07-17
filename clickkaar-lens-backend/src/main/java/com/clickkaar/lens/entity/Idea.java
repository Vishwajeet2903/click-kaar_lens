package com.clickkaar.lens.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ideas", indexes = {@Index(name = "idx_idea_slug", columnList = "slug")})
public class Idea extends BaseEntity {
  @Column(nullable = false)
  private String title;
  @Column(nullable = false, unique = true)
  private String slug;
  @Lob
  private String description;
  @Lob
  private String content;
  private String imageUrl;
  private String category;
  private String occasionCategory;
  private String businessCategory;
  private boolean featured = false;
  private boolean active = true;
  private String seoTitle;
  private String seoDescription;
}
