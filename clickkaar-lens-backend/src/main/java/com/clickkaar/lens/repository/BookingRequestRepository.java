package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.BookingRequest;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BookingRequestRepository extends JpaRepository<BookingRequest, Long>, JpaSpecificationExecutor<BookingRequest> {
  Optional<BookingRequest> findByBookingReference(String bookingReference);
  long countByBookingReferenceStartingWith(String prefix);
}
