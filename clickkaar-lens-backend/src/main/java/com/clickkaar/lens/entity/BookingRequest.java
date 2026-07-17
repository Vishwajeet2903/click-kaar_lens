package com.clickkaar.lens.entity;

import com.clickkaar.lens.enums.BookingStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "booking_requests", indexes = {
    @Index(name = "idx_booking_reference", columnList = "booking_reference"),
    @Index(name = "idx_booking_status", columnList = "status"),
    @Index(name = "idx_booking_city", columnList = "city")
})
public class BookingRequest extends BaseEntity {
  @Column(nullable = false, unique = true, length = 40)
  private String bookingReference;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;
  @Column(nullable = false)
  private String customerName;
  private String email;
  @Column(nullable = false)
  private String phone;
  private String serviceCategory;
  private String occasionCategory;
  private String businessCategory;
  private LocalDate bookingDate;
  private LocalTime startTime;
  private Integer durationHours;
  @Lob
  private String address;
  private String city;
  private String state;
  private String postalCode;
  private BigDecimal budget;
  @Lob
  private String requirements;
  @Enumerated(EnumType.STRING)
  private BookingStatus status = BookingStatus.PENDING;
  private String assignedProfessional;
  @Lob
  private String adminRemarks;
}
