package com.clickkaar.lens.entity;

import com.clickkaar.lens.enums.ApplicationRole;
import com.clickkaar.lens.enums.ApplicationStatus;
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
@Table(name = "join_applications")
public class JoinApplication extends BaseEntity {
  private String firstName;
  private String lastName;
  @Column(nullable = false)
  private String email;
  @Column(nullable = false)
  private String phone;
  private String city;
  private String state;
  @Enumerated(EnumType.STRING)
  private ApplicationRole applicationRole;
  private Integer experienceYears;
  @Lob
  private String skills;
  @Lob
  private String equipmentDetails;
  private String portfolioUrl;
  private String instagramUrl;
  private String resumeUrl;
  @Lob
  private String message;
  @Enumerated(EnumType.STRING)
  private ApplicationStatus status = ApplicationStatus.SUBMITTED;
  @Lob
  private String adminRemarks;
}
