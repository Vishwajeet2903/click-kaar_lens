package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.validation.StrongPassword;
import jakarta.validation.constraints.NotBlank;

public record ChangePasswordRequest(@NotBlank String currentPassword, @StrongPassword String newPassword) {}
