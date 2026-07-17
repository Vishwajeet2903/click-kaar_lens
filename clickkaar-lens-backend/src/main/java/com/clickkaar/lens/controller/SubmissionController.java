package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.*;
import com.clickkaar.lens.enums.EnquiryStatus;
import com.clickkaar.lens.service.SubmissionService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class SubmissionController {
  private final SubmissionService service;
  @PostMapping("/api/v1/enquiries") ApiResponse<IdResponse> enquiry(@Valid @RequestBody EnquiryRequest request) { return ApiResponse.created("Enquiry submitted", service.createEnquiry(request)); }
  @GetMapping("/api/v1/admin/enquiries") ApiResponse<PageResponse<Map<String, Object>>> enquiries(@RequestParam(required = false) String keyword, @RequestParam(required = false) EnquiryStatus status, @RequestParam(required = false) String city, @RequestParam(required = false) String serviceType, @RequestParam(required = false) LocalDate from, @RequestParam(required = false) LocalDate to, Pageable pageable) { return ApiResponse.ok("Enquiries fetched", service.enquiries(keyword, status, city, serviceType, from, to, pageable)); }
  @GetMapping("/api/v1/admin/enquiries/{id}") ApiResponse<Map<String, Object>> enquiry(@PathVariable Long id) { return ApiResponse.ok("Enquiry fetched", service.enquiry(id)); }
  @PatchMapping("/api/v1/admin/enquiries/{id}/status") ApiResponse<Map<String, Object>> enquiryStatus(@PathVariable Long id, @Valid @RequestBody AdminStatusRequest request) { return ApiResponse.ok("Enquiry status updated", service.updateEnquiryStatus(id, request)); }
  @PatchMapping("/api/v1/admin/enquiries/{id}/assign") ApiResponse<Map<String, Object>> enquiryAssign(@PathVariable Long id, @Valid @RequestBody AdminAssignRequest request) { return ApiResponse.ok("Enquiry assigned", service.assignEnquiry(id, request)); }
  @PutMapping("/api/v1/admin/enquiries/{id}/remarks") ApiResponse<Map<String, Object>> enquiryRemarks(@PathVariable Long id, @Valid @RequestBody AdminRemarksRequest request) { return ApiResponse.ok("Enquiry remarks updated", service.remarkEnquiry(id, request)); }
  @DeleteMapping("/api/v1/admin/enquiries/{id}") ApiResponse<Void> deleteEnquiry(@PathVariable Long id) { service.deleteEnquiry(id); return ApiResponse.ok("Enquiry deleted", null); }
  @PostMapping("/api/v1/contact") ApiResponse<IdResponse> contact(@Valid @RequestBody ContactMessageRequest request) { return ApiResponse.created("Contact message submitted", service.createContact(request)); }
  @GetMapping("/api/v1/admin/contact-messages") ApiResponse<PageResponse<Map<String, Object>>> contacts(Pageable pageable) { return ApiResponse.ok("Contact messages fetched", service.contacts(pageable)); }
  @GetMapping("/api/v1/admin/contact-messages/{id}") ApiResponse<Map<String, Object>> contactMessage(@PathVariable Long id) { return ApiResponse.ok("Contact message fetched", Map.of("id", id)); }
  @PatchMapping("/api/v1/admin/contact-messages/{id}/status") ApiResponse<Map<String, Object>> contactStatus(@PathVariable Long id, @Valid @RequestBody AdminStatusRequest request) { return ApiResponse.ok("Contact status updated", service.updateContactStatus(id, request)); }
  @PostMapping("/api/v1/admin/contact-messages/{id}/reply") ApiResponse<Map<String, Object>> contactReply(@PathVariable Long id, @Valid @RequestBody AdminRemarksRequest request) { return ApiResponse.ok("Contact replied", service.replyContact(id, request)); }
  @DeleteMapping("/api/v1/admin/contact-messages/{id}") ApiResponse<Void> deleteContact(@PathVariable Long id) { service.deleteContact(id); return ApiResponse.ok("Contact deleted", null); }
  @PostMapping("/api/v1/bookings") ApiResponse<Map<String, Object>> booking(@Valid @RequestBody BookingRequestDto request) { return ApiResponse.created("Booking request submitted", service.createBooking(request)); }
  @GetMapping("/api/v1/bookings/my-bookings") ApiResponse<PageResponse<Map<String, Object>>> myBookings(Pageable pageable) { return ApiResponse.ok("Bookings fetched", service.myBookings(pageable)); }
  @GetMapping("/api/v1/bookings/{bookingReference}") ApiResponse<Map<String, Object>> booking(@PathVariable String bookingReference) { return ApiResponse.ok("Booking fetched", service.booking(bookingReference)); }
  @GetMapping("/api/v1/admin/bookings") ApiResponse<PageResponse<Map<String, Object>>> adminBookings(Pageable pageable) { return ApiResponse.ok("Bookings fetched", service.adminBookings(pageable)); }
  @PatchMapping("/api/v1/admin/bookings/{id}/status") ApiResponse<Map<String, Object>> bookingStatus(@PathVariable Long id, @Valid @RequestBody AdminStatusRequest request) { return ApiResponse.ok("Booking status updated", service.updateBookingStatus(id, request)); }
  @PatchMapping("/api/v1/admin/bookings/{id}/assign") ApiResponse<Map<String, Object>> bookingAssign(@PathVariable Long id, @Valid @RequestBody AdminAssignRequest request) { return ApiResponse.ok("Booking assigned", service.assignBooking(id, request)); }
  @PutMapping("/api/v1/admin/bookings/{id}/remarks") ApiResponse<Map<String, Object>> bookingRemark(@PathVariable Long id, @Valid @RequestBody AdminRemarksRequest request) { return ApiResponse.ok("Booking remarks updated", service.remarkBooking(id, request)); }
  @PostMapping("/api/v1/join-applications") ApiResponse<IdResponse> join(@Valid @RequestBody JoinApplicationRequest request) { return ApiResponse.created("Join application submitted", service.createJoinApplication(request)); }
  @GetMapping("/api/v1/admin/join-applications") ApiResponse<PageResponse<Map<String, Object>>> joins(Pageable pageable) { return ApiResponse.ok("Join applications fetched", service.joinApplications(pageable)); }
  @GetMapping("/api/v1/admin/join-applications/{id}") ApiResponse<Map<String, Object>> join(@PathVariable Long id) { return ApiResponse.ok("Join application fetched", service.joinApplication(id)); }
  @PatchMapping("/api/v1/admin/join-applications/{id}/status") ApiResponse<Map<String, Object>> joinStatus(@PathVariable Long id, @Valid @RequestBody AdminStatusRequest request) { return ApiResponse.ok("Join status updated", service.updateJoinStatus(id, request)); }
  @PutMapping("/api/v1/admin/join-applications/{id}/remarks") ApiResponse<Map<String, Object>> joinRemark(@PathVariable Long id, @Valid @RequestBody AdminRemarksRequest request) { return ApiResponse.ok("Join remarks updated", service.remarkJoin(id, request)); }
  @PostMapping("/api/v1/partner-applications") ApiResponse<IdResponse> partner(@Valid @RequestBody PartnerApplicationRequest request) { return ApiResponse.created("Partner application submitted", service.createPartnerApplication(request)); }
  @GetMapping("/api/v1/admin/partner-applications") ApiResponse<PageResponse<Map<String, Object>>> partners(Pageable pageable) { return ApiResponse.ok("Partner applications fetched", service.partnerApplications(pageable)); }
  @PatchMapping("/api/v1/admin/partner-applications/{id}/status") ApiResponse<Map<String, Object>> partnerStatus(@PathVariable Long id, @Valid @RequestBody AdminStatusRequest request) { return ApiResponse.ok("Partner status updated", service.updatePartnerStatus(id, request)); }
  @PutMapping("/api/v1/admin/partner-applications/{id}/remarks") ApiResponse<Map<String, Object>> partnerRemark(@PathVariable Long id, @Valid @RequestBody AdminRemarksRequest request) { return ApiResponse.ok("Partner remarks updated", service.remarkPartner(id, request)); }
}
