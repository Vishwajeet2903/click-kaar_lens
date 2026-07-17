package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.validation.IndianPhone;
import com.clickkaar.lens.validation.StrongPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
    @NotBlank String firstName,
    @NotBlank String lastName,
    @Email @NotBlank String email,
    @IndianPhone String phone,
    @StrongPassword String password,
    @NotBlank String confirmPassword
) {}
