package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.IdResponse;
import com.clickkaar.lens.dto.response.PageResponse;
import com.clickkaar.lens.entity.*;
import com.clickkaar.lens.enums.*;
import com.clickkaar.lens.exception.ResourceNotFoundException;
import com.clickkaar.lens.mapper.LensMapper;
import com.clickkaar.lens.repository.*;
import com.clickkaar.lens.service.SubmissionService;
import com.clickkaar.lens.specification.EnquirySpecifications;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {
  private final EnquiryRepository enquiryRepository;
  private final ContactMessageRepository contactRepository;
  private final BookingRequestRepository bookingRepository;
  private final JoinApplicationRepository joinRepository;
  private final PartnerApplicationRepository partnerRepository;
  private final LensMapper mapper;

  @Transactional public IdResponse createEnquiry(EnquiryRequest r) { Enquiry e = new Enquiry(); e.setName(r.name()); e.setEmail(r.email()); e.setPhone(r.phone()); e.setCity(r.city()); e.setServiceType(r.serviceType()); e.setOccasionCategory(r.occasionCategory()); e.setBusinessCategory(r.businessCategory()); e.setEventDate(r.eventDate()); e.setBudgetRange(r.budgetRange()); if (r.preferredContactMethod() != null) e.setPreferredContactMethod(r.preferredContactMethod()); e.setMessage(r.message()); e.setSource(r.source()); return new IdResponse(enquiryRepository.save(e).getId()); }
  public PageResponse<Map<String, Object>> enquiries(String keyword, EnquiryStatus status, String city, String serviceType, LocalDate from, LocalDate to, Pageable pageable) { return PageResponse.from(enquiryRepository.findAll(EnquirySpecifications.filter(keyword, status, city, serviceType, from, to), pageable).map(this::view)); }
  public Map<String, Object> enquiry(Long id) { return view(enquiryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Enquiry not found"))); }
  @Transactional public Map<String, Object> updateEnquiryStatus(Long id, AdminStatusRequest r) { Enquiry e = enquiryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Enquiry not found")); e.setStatus(EnquiryStatus.valueOf(r.status())); return view(e); }
  @Transactional public Map<String, Object> assignEnquiry(Long id, AdminAssignRequest r) { Enquiry e = enquiryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Enquiry not found")); e.setAssignedTo(r.assignedTo()); return view(e); }
  @Transactional public Map<String, Object> remarkEnquiry(Long id, AdminRemarksRequest r) { Enquiry e = enquiryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Enquiry not found")); e.setAdminRemarks(r.remarks()); return view(e); }
  @Transactional public void deleteEnquiry(Long id) { enquiryRepository.deleteById(id); }
  @Transactional public IdResponse createContact(ContactMessageRequest r) { ContactMessage m = new ContactMessage(); m.setName(r.name()); m.setEmail(r.email()); m.setPhone(r.phone()); m.setSubject(r.subject()); m.setMessage(r.message()); return new IdResponse(contactRepository.save(m).getId()); }
  public PageResponse<Map<String, Object>> contacts(Pageable pageable) { return PageResponse.from(contactRepository.findAll(pageable).map(this::view)); }
  @Transactional public Map<String, Object> updateContactStatus(Long id, AdminStatusRequest r) { ContactMessage m = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact message not found")); m.setStatus(ContactStatus.valueOf(r.status())); return view(m); }
  @Transactional public Map<String, Object> replyContact(Long id, AdminRemarksRequest r) { ContactMessage m = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact message not found")); m.setAdminReply(r.remarks()); m.setStatus(ContactStatus.REPLIED); return view(m); }
  @Transactional public void deleteContact(Long id) { contactRepository.deleteById(id); }
  @Transactional public Map<String, Object> createBooking(BookingRequestDto r) { BookingRequest b = new BookingRequest(); b.setBookingReference(nextBookingReference()); b.setCustomerName(r.customerName()); b.setEmail(r.email()); b.setPhone(r.phone()); b.setServiceCategory(r.serviceCategory()); b.setOccasionCategory(r.occasionCategory()); b.setBusinessCategory(r.businessCategory()); b.setBookingDate(r.bookingDate()); b.setStartTime(r.startTime()); b.setDurationHours(r.durationHours()); b.setAddress(r.address()); b.setCity(r.city()); b.setState(r.state()); b.setPostalCode(r.postalCode()); b.setBudget(r.budget()); b.setRequirements(r.requirements()); return view(bookingRepository.save(b)); }
  public PageResponse<Map<String, Object>> myBookings(Pageable pageable) { return PageResponse.from(bookingRepository.findAll(pageable).map(this::view)); }
  public Map<String, Object> booking(String ref) { return view(bookingRepository.findByBookingReference(ref).orElseThrow(() -> new ResourceNotFoundException("Booking not found"))); }
  public PageResponse<Map<String, Object>> adminBookings(Pageable pageable) { return PageResponse.from(bookingRepository.findAll(pageable).map(this::view)); }
  @Transactional public Map<String, Object> updateBookingStatus(Long id, AdminStatusRequest r) { BookingRequest b = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found")); b.setStatus(BookingStatus.valueOf(r.status())); return view(b); }
  @Transactional public Map<String, Object> assignBooking(Long id, AdminAssignRequest r) { BookingRequest b = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found")); b.setAssignedProfessional(r.assignedTo()); return view(b); }
  @Transactional public Map<String, Object> remarkBooking(Long id, AdminRemarksRequest r) { BookingRequest b = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found")); b.setAdminRemarks(r.remarks()); return view(b); }
  @Transactional public IdResponse createJoinApplication(JoinApplicationRequest r) { JoinApplication a = new JoinApplication(); a.setFirstName(r.firstName()); a.setLastName(r.lastName()); a.setEmail(r.email()); a.setPhone(r.phone()); a.setCity(r.city()); a.setState(r.state()); a.setApplicationRole(r.applicationRole()); a.setExperienceYears(r.experienceYears()); a.setSkills(r.skills()); a.setEquipmentDetails(r.equipmentDetails()); a.setPortfolioUrl(r.portfolioUrl()); a.setInstagramUrl(r.instagramUrl()); a.setResumeUrl(r.resumeUrl()); a.setMessage(r.message()); return new IdResponse(joinRepository.save(a).getId()); }
  public PageResponse<Map<String, Object>> joinApplications(Pageable pageable) { return PageResponse.from(joinRepository.findAll(pageable).map(this::view)); }
  public Map<String, Object> joinApplication(Long id) { return view(joinRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Join application not found"))); }
  @Transactional public Map<String, Object> updateJoinStatus(Long id, AdminStatusRequest r) { JoinApplication a = joinRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Join application not found")); a.setStatus(ApplicationStatus.valueOf(r.status())); return view(a); }
  @Transactional public Map<String, Object> remarkJoin(Long id, AdminRemarksRequest r) { JoinApplication a = joinRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Join application not found")); a.setAdminRemarks(r.remarks()); return view(a); }
  @Transactional public IdResponse createPartnerApplication(PartnerApplicationRequest r) { PartnerApplication a = new PartnerApplication(); a.setBusinessName(r.businessName()); a.setContactPersonName(r.contactPersonName()); a.setEmail(r.email()); a.setPhone(r.phone()); a.setBusinessType(r.businessType()); a.setGstNumber(r.gstNumber()); a.setCity(r.city()); a.setState(r.state()); a.setWebsiteUrl(r.websiteUrl()); a.setPortfolioUrl(r.portfolioUrl()); a.setExperienceYears(r.experienceYears()); a.setMessage(r.message()); return new IdResponse(partnerRepository.save(a).getId()); }
  public PageResponse<Map<String, Object>> partnerApplications(Pageable pageable) { return PageResponse.from(partnerRepository.findAll(pageable).map(this::view)); }
  @Transactional public Map<String, Object> updatePartnerStatus(Long id, AdminStatusRequest r) { PartnerApplication a = partnerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Partner application not found")); a.setStatus(PartnerStatus.valueOf(r.status())); return view(a); }
  @Transactional public Map<String, Object> remarkPartner(Long id, AdminRemarksRequest r) { PartnerApplication a = partnerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Partner application not found")); a.setAdminRemarks(r.remarks()); return view(a); }

  private String nextBookingReference() { String prefix = "CKL-" + LocalDate.now().getYear() + "-"; return prefix + String.format("%06d", bookingRepository.countByBookingReferenceStartingWith(prefix) + 1); }
  private Map<String, Object> view(Object entity) { Map<String, Object> map = entity instanceof BaseEntity b ? mapper.base(b) : new LinkedHashMap<>(); map.put("type", entity.getClass().getSimpleName()); return map; }
}
