package com.clickkaar.lens.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "service_categories", indexes = {@Index(name = "idx_service_slug", columnList = "slug")})
public class ServiceCategory extends BaseEntity {
  @Column(nullable = false, length = 120)
  private String name;
  @Column(nullable = false, unique = true, length = 160)
  private String slug;
  private String shortDescription;
  @Lob
  private String description;
  private String imageUrl;
  private String iconUrl;
  private boolean active = true;
  private boolean featured = false;
  private Integer displayOrder = 0;
  private BigDecimal startingPrice;
  private String seoTitle;
  private String seoDescription;
}
