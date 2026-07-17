package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.enums.ApplicationRole;
import com.clickkaar.lens.validation.IndianPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record JoinApplicationRequest(String firstName, String lastName, @Email @NotBlank String email, @IndianPhone String phone, String city, String state, ApplicationRole applicationRole, @PositiveOrZero Integer experienceYears, String skills, String equipmentDetails, String portfolioUrl, String instagramUrl, String resumeUrl, String message) {}
