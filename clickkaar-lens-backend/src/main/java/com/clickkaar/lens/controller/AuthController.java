package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.ApiResponse;
import com.clickkaar.lens.dto.response.AuthResponse;
import com.clickkaar.lens.dto.response.UserResponse;
import com.clickkaar.lens.service.AuthService;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @PostMapping("/register") ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) { return ResponseEntity.status(201).body(ApiResponse.created("Registered successfully", authService.register(request))); }
  @PostMapping("/login") ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) { return ApiResponse.ok("Logged in successfully", authService.login(request)); }
  @PostMapping("/refresh-token") ApiResponse<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) { return ApiResponse.ok("Token refreshed", authService.refresh(request)); }
  @PostMapping("/logout") ApiResponse<Void> logout() { authService.logout(); return ApiResponse.ok("Logged out", null); }
  @PostMapping("/forgot-password") ApiResponse<Void> forgot(@RequestBody Map<String, String> body) { authService.forgotPassword(body.get("email")); return ApiResponse.ok("Password reset instructions accepted", null); }
  @PostMapping("/reset-password") ApiResponse<Void> reset(@RequestBody Map<String, String> body) { authService.resetPassword(body.get("token"), body.get("password")); return ApiResponse.ok("Password reset accepted", null); }
  @PostMapping("/change-password") ApiResponse<Void> change(@Valid @RequestBody ChangePasswordRequest request) { authService.changePassword(request); return ApiResponse.ok("Password changed", null); }
  @GetMapping("/me") ApiResponse<UserResponse> me() { return ApiResponse.ok("Current user", authService.me()); }
}
