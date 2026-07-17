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
@Table(name = "business_categories", indexes = {@Index(name = "idx_business_slug", columnList = "slug")})
public class BusinessCategory extends BaseEntity {
  @Column(nullable = false, length = 120)
  private String name;
  @Column(nullable = false, unique = true, length = 160)
  private String slug;
  @Lob
  private String description;
  private String imageUrl;
  private BigDecimal startingPrice;
  private boolean active = true;
  private boolean featured = false;
  private Integer displayOrder = 0;
}
