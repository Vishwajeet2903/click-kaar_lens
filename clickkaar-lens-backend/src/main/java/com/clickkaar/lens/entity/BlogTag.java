package com.clickkaar.lens.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "blog_tags")
public class BlogTag extends BaseEntity {
  @Column(nullable = false, unique = true)
  private String name;
  @Column(nullable = false, unique = true)
  private String slug;
}
