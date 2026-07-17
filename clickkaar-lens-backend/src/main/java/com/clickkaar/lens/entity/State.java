package com.clickkaar.lens.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "states")
public class State extends BaseEntity {
  @Column(nullable = false, unique = true)
  private String name;
  @Column(nullable = false, unique = true, length = 12)
  private String code;
  private boolean active = true;
}
