package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.response.ApiResponse;
import com.clickkaar.lens.service.AdminDashboardService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {
  private final AdminDashboardService service;
  @GetMapping("/summary") ApiResponse<Map<String, Object>> summary() { return ApiResponse.ok("Dashboard summary fetched", service.summary()); }
  @GetMapping("/monthly-statistics") ApiResponse<List<Map<String, Object>>> monthly() { return ApiResponse.ok("Monthly statistics fetched", service.monthlyStatistics()); }
  @GetMapping("/recent-enquiries") ApiResponse<List<Map<String, Object>>> enquiries() { return ApiResponse.ok("Recent enquiries fetched", service.recentEnquiries()); }
  @GetMapping("/recent-bookings") ApiResponse<List<Map<String, Object>>> bookings() { return ApiResponse.ok("Recent bookings fetched", service.recentBookings()); }
}
