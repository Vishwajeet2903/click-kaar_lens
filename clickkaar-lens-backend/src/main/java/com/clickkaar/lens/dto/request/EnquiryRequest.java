package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.enums.PreferredContactMethod;
import com.clickkaar.lens.validation.IndianPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record EnquiryRequest(
    @NotBlank String name,
    @Email String email,
    @IndianPhone String phone,
    @NotBlank String city,
    String serviceType,
    String occasionCategory,
    String businessCategory,
    @FutureOrPresent LocalDate eventDate,
    String budgetRange,
    PreferredContactMethod preferredContactMethod,
    @Size(max = 1000) String message,
    String source
) {}
