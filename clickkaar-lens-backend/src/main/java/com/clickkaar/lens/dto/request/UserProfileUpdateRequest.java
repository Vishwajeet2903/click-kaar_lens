package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.validation.IndianPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserProfileUpdateRequest(@NotBlank String firstName, @NotBlank String lastName, @Email @NotBlank String email, @IndianPhone String phone, String profileImageUrl) {}
