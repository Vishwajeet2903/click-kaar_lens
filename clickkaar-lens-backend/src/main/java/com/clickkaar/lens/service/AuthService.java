package com.clickkaar.lens.service;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.AuthResponse;
import com.clickkaar.lens.dto.response.UserResponse;

public interface AuthService {
  AuthResponse register(RegisterRequest request);
  AuthResponse login(LoginRequest request);
  AuthResponse refresh(RefreshTokenRequest request);
  void logout();
  void forgotPassword(String email);
  void resetPassword(String token, String password);
  void changePassword(ChangePasswordRequest request);
  UserResponse me();
}
