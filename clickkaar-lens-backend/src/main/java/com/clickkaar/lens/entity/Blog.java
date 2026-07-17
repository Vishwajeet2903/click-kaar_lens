package com.clickkaar.lens.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "blogs", indexes = {@Index(name = "idx_blog_slug", columnList = "slug")})
public class Blog extends BaseEntity {
  @Column(nullable = false)
  private String title;
  @Column(nullable = false, unique = true)
  private String slug;
  @Lob
  private String excerpt;
  @Lob
  @Column(nullable = false)
  private String content;
  private String featuredImageUrl;
  private String author;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id")
  private BlogCategory category;
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "blog_tag_map", joinColumns = @JoinColumn(name = "blog_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
  private Set<BlogTag> tags = new LinkedHashSet<>();
  private boolean featured = false;
  private boolean published = false;
  private LocalDateTime publishedAt;
  private String seoTitle;
  private String seoDescription;
  private long viewCount = 0;
}
