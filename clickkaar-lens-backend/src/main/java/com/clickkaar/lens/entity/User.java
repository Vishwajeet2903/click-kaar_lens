package com.clickkaar.lens.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_users_email", columnList = "email"),
    @Index(name = "idx_users_phone", columnList = "phone"),
    @Index(name = "idx_users_created_at", columnList = "created_at")
})
public class User extends BaseEntity {
  @Column(nullable = false, length = 80)
  private String firstName;
  @Column(nullable = false, length = 80)
  private String lastName;
  @Column(nullable = false, unique = true, length = 160)
  private String email;
  @Column(nullable = false, unique = true, length = 20)
  private String phone;
  @Column(nullable = false)
  private String password;
  private String profileImageUrl;
  @Column(nullable = false)
  private boolean enabled = true;
  @Column(nullable = false)
  private boolean emailVerified = false;
  @Column(nullable = false)
  private boolean accountLocked = false;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new LinkedHashSet<>();
}
