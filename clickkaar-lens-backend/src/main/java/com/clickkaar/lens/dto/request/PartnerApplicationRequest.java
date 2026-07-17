package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.validation.IndianPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record PartnerApplicationRequest(@NotBlank String businessName, String contactPersonName, @Email @NotBlank String email, @IndianPhone String phone, String businessType, String gstNumber, String city, String state, String websiteUrl, String portfolioUrl, @PositiveOrZero Integer experienceYears, String message) {}
