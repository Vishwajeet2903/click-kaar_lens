package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.request.ChangePasswordRequest;
import com.clickkaar.lens.dto.request.UserProfileUpdateRequest;
import com.clickkaar.lens.dto.response.ApiResponse;
import com.clickkaar.lens.dto.response.UserResponse;
import com.clickkaar.lens.service.AuthService;
import com.clickkaar.lens.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final AuthService authService;

  @GetMapping("/profile") ApiResponse<UserResponse> profile() { return ApiResponse.ok("Profile fetched", userService.profile()); }
  @PutMapping("/profile") ApiResponse<UserResponse> update(@Valid @RequestBody UserProfileUpdateRequest request) { return ApiResponse.ok("Profile updated", userService.updateProfile(request)); }
  @PutMapping("/change-password") ApiResponse<Void> change(@Valid @RequestBody ChangePasswordRequest request) { authService.changePassword(request); return ApiResponse.ok("Password changed", null); }
  @DeleteMapping("/account") ApiResponse<Void> delete() { userService.deleteAccount(); return ApiResponse.ok("Account deleted", null); }
}
