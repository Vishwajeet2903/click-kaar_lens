package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.enums.BookingStatus;
import com.clickkaar.lens.enums.EnquiryStatus;
import com.clickkaar.lens.repository.*;
import com.clickkaar.lens.service.AdminDashboardService;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {
  private final UserRepository users; private final EnquiryRepository enquiries; private final BookingRequestRepository bookings; private final JoinApplicationRepository joins; private final PartnerApplicationRepository partners; private final BlogRepository blogs;
  public Map<String, Object> summary() {
    Map<String, Object> data = new LinkedHashMap<>();
    data.put("totalUsers", users.count());
    data.put("totalEnquiries", enquiries.count());
    data.put("newEnquiries", enquiries.count((root, q, cb) -> cb.equal(root.get("status"), EnquiryStatus.NEW)));
    data.put("totalBookings", bookings.count());
    data.put("pendingBookings", bookings.count((root, q, cb) -> cb.equal(root.get("status"), BookingStatus.PENDING)));
    data.put("confirmedBookings", bookings.count((root, q, cb) -> cb.equal(root.get("status"), BookingStatus.CONFIRMED)));
    data.put("totalJoinApplications", joins.count());
    data.put("totalPartnerApplications", partners.count());
    data.put("publishedBlogs", blogs.findByPublishedTrue(PageRequest.of(0, 1)).getTotalElements());
    data.put("monthlyEnquiryCount", enquiries.count());
    data.put("monthlyBookingCount", bookings.count());
    return data;
  }
  public List<Map<String, Object>> monthlyStatistics() { return List.of(Map.of("month", "current", "enquiries", enquiries.count(), "bookings", bookings.count())); }
  public List<Map<String, Object>> recentEnquiries() { return enquiries.findAll(PageRequest.of(0, 5)).stream().map(e -> Map.<String, Object>of("id", e.getId(), "name", e.getName(), "status", e.getStatus())).toList(); }
  public List<Map<String, Object>> recentBookings() { return bookings.findAll(PageRequest.of(0, 5)).stream().map(b -> Map.<String, Object>of("id", b.getId(), "bookingReference", b.getBookingReference(), "status", b.getStatus())).toList(); }
}
