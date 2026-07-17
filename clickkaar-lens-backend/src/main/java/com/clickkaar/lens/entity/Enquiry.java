package com.clickkaar.lens.entity;

import com.clickkaar.lens.enums.EnquiryStatus;
import com.clickkaar.lens.enums.PreferredContactMethod;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "enquiries", indexes = {
    @Index(name = "idx_enquiry_phone", columnList = "phone"),
    @Index(name = "idx_enquiry_email", columnList = "email"),
    @Index(name = "idx_enquiry_status", columnList = "status"),
    @Index(name = "idx_enquiry_city", columnList = "city"),
    @Index(name = "idx_enquiry_event_date", columnList = "event_date"),
    @Index(name = "idx_enquiry_created_at", columnList = "created_at")
})
public class Enquiry extends BaseEntity {
  @Column(nullable = false, length = 120)
  private String name;
  private String email;
  @Column(nullable = false, length = 20)
  private String phone;
  @Column(nullable = false, length = 100)
  private String city;
  private String serviceType;
  private String occasionCategory;
  private String businessCategory;
  private LocalDate eventDate;
  private String budgetRange;
  @Enumerated(EnumType.STRING)
  private PreferredContactMethod preferredContactMethod = PreferredContactMethod.PHONE;
  @Lob
  private String message;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 40)
  private EnquiryStatus status = EnquiryStatus.NEW;
  @Lob
  private String adminRemarks;
  private String assignedTo;
  private String source;
}
