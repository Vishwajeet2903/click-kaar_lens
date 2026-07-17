package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.AuthResponse;
import com.clickkaar.lens.dto.response.UserResponse;
import com.clickkaar.lens.entity.Role;
import com.clickkaar.lens.entity.User;
import com.clickkaar.lens.enums.RoleName;
import com.clickkaar.lens.exception.BadRequestException;
import com.clickkaar.lens.exception.DuplicateResourceException;
import com.clickkaar.lens.mapper.LensMapper;
import com.clickkaar.lens.repository.RoleRepository;
import com.clickkaar.lens.repository.UserRepository;
import com.clickkaar.lens.security.jwt.JwtService;
import com.clickkaar.lens.security.service.UserPrincipal;
import com.clickkaar.lens.service.AuthService;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final LensMapper mapper;

  @Override
  @Transactional
  public AuthResponse register(RegisterRequest request) {
    if (!request.password().equals(request.confirmPassword())) throw new BadRequestException("Password and confirm password must match");
    if (userRepository.existsByEmailIgnoreCase(request.email())) throw new DuplicateResourceException("Email is already registered");
    if (userRepository.existsByPhone(request.phone())) throw new DuplicateResourceException("Phone is already registered");
    Role role = roleRepository.findByName(RoleName.ROLE_CUSTOMER).orElseThrow(() -> new BadRequestException("Customer role is not configured"));
    User user = new User();
    user.setFirstName(request.firstName());
    user.setLastName(request.lastName());
    user.setEmail(request.email().toLowerCase());
    user.setPhone(request.phone());
    user.setPassword(passwordEncoder.encode(request.password()));
    user.setRoles(Set.of(role));
    user = userRepository.save(user);
    return tokenResponse(user);
  }

  @Override
  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    User user = userRepository.findByEmailIgnoreCase(request.email()).orElseThrow(() -> new BadRequestException("Invalid credentials"));
    return tokenResponse(user);
  }

  @Override
  public AuthResponse refresh(RefreshTokenRequest request) {
    String email = jwtService.extractUsername(request.refreshToken());
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow(() -> new BadRequestException("Invalid refresh token"));
    return tokenResponse(user);
  }

  @Override
  public void logout() {
    SecurityContextHolder.clearContext();
  }

  @Override
  public void forgotPassword(String email) {
    if (email == null || email.isBlank()) throw new BadRequestException("Email is required");
  }

  @Override
  public void resetPassword(String token, String password) {
    if (token == null || token.isBlank() || password == null || password.isBlank()) throw new BadRequestException("Token and password are required");
  }

  @Override
  @Transactional
  public void changePassword(ChangePasswordRequest request) {
    User user = currentUser();
    if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) throw new BadRequestException("Current password is incorrect");
    user.setPassword(passwordEncoder.encode(request.newPassword()));
  }

  @Override
  @Transactional(readOnly = true)
  public UserResponse me() {
    return mapper.user(currentUser());
  }

  private AuthResponse tokenResponse(User user) {
    UserPrincipal principal = new UserPrincipal(user);
    return new AuthResponse(jwtService.generateAccessToken(principal), jwtService.generateRefreshToken(principal), jwtService.accessExpiration(), mapper.user(user));
  }

  private User currentUser() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepository.findByEmailIgnoreCase(email).orElseThrow(() -> new BadRequestException("Current user not found"));
  }
}
