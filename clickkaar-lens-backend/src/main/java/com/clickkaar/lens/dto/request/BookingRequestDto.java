package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.validation.IndianPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record BookingRequestDto(
    @NotBlank String customerName,
    @Email String email,
    @IndianPhone String phone,
    String serviceCategory,
    String occasionCategory,
    String businessCategory,
    @FutureOrPresent LocalDate bookingDate,
    LocalTime startTime,
    @Positive Integer durationHours,
    String address,
    String city,
    String state,
    String postalCode,
    @Positive BigDecimal budget,
    String requirements
) {}
