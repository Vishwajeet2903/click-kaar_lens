package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.PageResponse;
import com.clickkaar.lens.dto.response.UserResponse;
import com.clickkaar.lens.entity.Role;
import com.clickkaar.lens.entity.User;
import com.clickkaar.lens.exception.ResourceNotFoundException;
import com.clickkaar.lens.mapper.LensMapper;
import com.clickkaar.lens.repository.RoleRepository;
import com.clickkaar.lens.repository.UserRepository;
import com.clickkaar.lens.service.UserService;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final LensMapper mapper;

  @Override
  public UserResponse profile() {
    return mapper.user(currentUser());
  }

  @Override
  @Transactional
  public UserResponse updateProfile(UserProfileUpdateRequest request) {
    User user = currentUser();
    user.setFirstName(request.firstName());
    user.setLastName(request.lastName());
    user.setEmail(request.email().toLowerCase());
    user.setPhone(request.phone());
    user.setProfileImageUrl(request.profileImageUrl());
    return mapper.user(user);
  }

  @Override
  @Transactional
  public void deleteAccount() {
    currentUser().setDeleted(true);
  }

  @Override
  public PageResponse<UserResponse> adminUsers(String search, Pageable pageable) {
    var page = (search == null || search.isBlank())
        ? userRepository.findAll(pageable)
        : userRepository.findByEmailContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(search, search, search, pageable);
    return PageResponse.from(page.map(mapper::user));
  }

  @Override
  public UserResponse adminUser(Long id) {
    return mapper.user(findUser(id));
  }

  @Override
  @Transactional
  public UserResponse updateStatus(Long id, AdminUserStatusRequest request) {
    User user = findUser(id);
    if (request.enabled() != null) user.setEnabled(request.enabled());
    if (request.accountLocked() != null) user.setAccountLocked(request.accountLocked());
    return mapper.user(user);
  }

  @Override
  @Transactional
  public UserResponse updateRoles(Long id, AdminUserRolesRequest request) {
    User user = findUser(id);
    Set<Role> roles = request.roles().stream()
        .map(roleName -> roleRepository.findByName(roleName).orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName)))
        .collect(Collectors.toSet());
    user.setRoles(roles);
    return mapper.user(user);
  }

  private User currentUser() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepository.findByEmailIgnoreCase(email).orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
  }

  private User findUser(Long id) {
    return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }
}
