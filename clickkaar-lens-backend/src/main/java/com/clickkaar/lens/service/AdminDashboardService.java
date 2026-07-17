package com.clickkaar.lens.service;

import java.util.List;
import java.util.Map;

public interface AdminDashboardService {
  Map<String, Object> summary();
  List<Map<String, Object>> monthlyStatistics();
  List<Map<String, Object>> recentEnquiries();
  List<Map<String, Object>> recentBookings();
}
