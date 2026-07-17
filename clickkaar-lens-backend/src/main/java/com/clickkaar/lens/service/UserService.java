package com.clickkaar.lens.service;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.PageResponse;
import com.clickkaar.lens.dto.response.UserResponse;
import org.springframework.data.domain.Pageable;

public interface UserService {
  UserResponse profile();
  UserResponse updateProfile(UserProfileUpdateRequest request);
  void deleteAccount();
  PageResponse<UserResponse> adminUsers(String search, Pageable pageable);
  UserResponse adminUser(Long id);
  UserResponse updateStatus(Long id, AdminUserStatusRequest request);
  UserResponse updateRoles(Long id, AdminUserRolesRequest request);
}
