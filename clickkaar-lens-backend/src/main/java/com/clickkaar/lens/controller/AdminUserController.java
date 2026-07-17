package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.*;
import com.clickkaar.lens.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
public class AdminUserController {
  private final UserService userService;
  @GetMapping ApiResponse<PageResponse<UserResponse>> users(@RequestParam(required = false) String search, Pageable pageable) { return ApiResponse.ok("Users fetched", userService.adminUsers(search, pageable)); }
  @GetMapping("/{id}") ApiResponse<UserResponse> user(@PathVariable Long id) { return ApiResponse.ok("User fetched", userService.adminUser(id)); }
  @PatchMapping("/{id}/status") ApiResponse<UserResponse> status(@PathVariable Long id, @RequestBody AdminUserStatusRequest request) { return ApiResponse.ok("User status updated", userService.updateStatus(id, request)); }
  @PatchMapping("/{id}/roles") ApiResponse<UserResponse> roles(@PathVariable Long id, @Valid @RequestBody AdminUserRolesRequest request) { return ApiResponse.ok("User roles updated", userService.updateRoles(id, request)); }
}
