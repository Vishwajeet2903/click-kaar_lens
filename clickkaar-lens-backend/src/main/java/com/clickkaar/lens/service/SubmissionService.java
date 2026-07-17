package com.clickkaar.lens.service;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.IdResponse;
import com.clickkaar.lens.dto.response.PageResponse;
import com.clickkaar.lens.enums.*;
import java.time.LocalDate;
import java.util.Map;
import org.springframework.data.domain.Pageable;

public interface SubmissionService {
  IdResponse createEnquiry(EnquiryRequest request);
  PageResponse<Map<String, Object>> enquiries(String keyword, EnquiryStatus status, String city, String serviceType, LocalDate from, LocalDate to, Pageable pageable);
  Map<String, Object> enquiry(Long id);
  Map<String, Object> updateEnquiryStatus(Long id, AdminStatusRequest request);
  Map<String, Object> assignEnquiry(Long id, AdminAssignRequest request);
  Map<String, Object> remarkEnquiry(Long id, AdminRemarksRequest request);
  void deleteEnquiry(Long id);
  IdResponse createContact(ContactMessageRequest request);
  PageResponse<Map<String, Object>> contacts(Pageable pageable);
  Map<String, Object> updateContactStatus(Long id, AdminStatusRequest request);
  Map<String, Object> replyContact(Long id, AdminRemarksRequest request);
  void deleteContact(Long id);
  Map<String, Object> createBooking(BookingRequestDto request);
  PageResponse<Map<String, Object>> myBookings(Pageable pageable);
  Map<String, Object> booking(String bookingReference);
  PageResponse<Map<String, Object>> adminBookings(Pageable pageable);
  Map<String, Object> updateBookingStatus(Long id, AdminStatusRequest request);
  Map<String, Object> assignBooking(Long id, AdminAssignRequest request);
  Map<String, Object> remarkBooking(Long id, AdminRemarksRequest request);
  IdResponse createJoinApplication(JoinApplicationRequest request);
  PageResponse<Map<String, Object>> joinApplications(Pageable pageable);
  Map<String, Object> joinApplication(Long id);
  Map<String, Object> updateJoinStatus(Long id, AdminStatusRequest request);
  Map<String, Object> remarkJoin(Long id, AdminRemarksRequest request);
  IdResponse createPartnerApplication(PartnerApplicationRequest request);
  PageResponse<Map<String, Object>> partnerApplications(Pageable pageable);
  Map<String, Object> updatePartnerStatus(Long id, AdminStatusRequest request);
  Map<String, Object> remarkPartner(Long id, AdminRemarksRequest request);
}
