package com.clickkaar.lens.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cities", indexes = {@Index(name = "idx_city_name", columnList = "name")})
public class City extends BaseEntity {
  @Column(nullable = false)
  private String name;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "state_id", nullable = false)
  private State state;
  private boolean active = true;
  private boolean serviceAvailable = true;
}
