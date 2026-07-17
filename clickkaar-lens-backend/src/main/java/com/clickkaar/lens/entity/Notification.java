package com.clickkaar.lens.entity;

import com.clickkaar.lens.enums.NotificationType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;
  private String title;
  @Lob
  private String message;
  @Enumerated(EnumType.STRING)
  private NotificationType type = NotificationType.SYSTEM;
  private Long referenceId;
  private boolean read = false;
}
