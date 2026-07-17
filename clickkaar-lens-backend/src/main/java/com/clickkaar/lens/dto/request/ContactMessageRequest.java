package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.validation.IndianPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactMessageRequest(@NotBlank String name, @Email @NotBlank String email, @IndianPhone String phone, String subject, @NotBlank @Size(max = 2000) String message) {}
