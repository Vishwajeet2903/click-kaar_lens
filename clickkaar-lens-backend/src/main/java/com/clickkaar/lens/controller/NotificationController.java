package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.response.ApiResponse;
import com.clickkaar.lens.dto.response.PageResponse;
import com.clickkaar.lens.service.NotificationService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {
  private final NotificationService service;
  @GetMapping ApiResponse<PageResponse<Map<String, Object>>> notifications(Pageable pageable) { return ApiResponse.ok("Notifications fetched", service.notifications(pageable)); }
  @PatchMapping("/{id}/read") ApiResponse<Map<String, Object>> read(@PathVariable Long id) { return ApiResponse.ok("Notification marked read", service.read(id)); }
  @PatchMapping("/read-all") ApiResponse<Void> readAll() { service.readAll(); return ApiResponse.ok("Notifications marked read", null); }
}
