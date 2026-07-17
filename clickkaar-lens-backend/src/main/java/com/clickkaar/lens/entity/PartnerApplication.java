package com.clickkaar.lens.entity;

import com.clickkaar.lens.enums.PartnerStatus;
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
@Table(name = "partner_applications")
public class PartnerApplication extends BaseEntity {
  @Column(nullable = false)
  private String businessName;
  private String contactPersonName;
  @Column(nullable = false)
  private String email;
  @Column(nullable = false)
  private String phone;
  private String businessType;
  private String gstNumber;
  private String city;
  private String state;
  private String websiteUrl;
  private String portfolioUrl;
  private Integer experienceYears;
  @Lob
  private String message;
  @Enumerated(EnumType.STRING)
  private PartnerStatus status = PartnerStatus.SUBMITTED;
  @Lob
  private String adminRemarks;
}
