package com.clickkaar.lens.entity;

import com.clickkaar.lens.enums.ContactStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "contact_messages")
public class ContactMessage extends BaseEntity {
  @Column(nullable = false, length = 120)
  private String name;
  @Column(nullable = false, length = 160)
  private String email;
  private String phone;
  private String subject;
  @Lob
  @Column(nullable = false)
  private String message;
  @Enumerated(EnumType.STRING)
  private ContactStatus status = ContactStatus.NEW;
  @Lob
  private String adminReply;
}
