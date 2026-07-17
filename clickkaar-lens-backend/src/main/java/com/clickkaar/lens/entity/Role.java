package com.clickkaar.lens.entity;

import com.clickkaar.lens.enums.RoleName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role extends BaseEntity {
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, unique = true, length = 50)
  private RoleName name;
}
