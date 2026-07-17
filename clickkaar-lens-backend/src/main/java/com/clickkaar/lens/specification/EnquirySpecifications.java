package com.clickkaar.lens.specification;

import com.clickkaar.lens.entity.Enquiry;
import com.clickkaar.lens.enums.EnquiryStatus;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;

public final class EnquirySpecifications {
  private EnquirySpecifications() {}

  public static Specification<Enquiry> filter(String keyword, EnquiryStatus status, String city, String serviceType, LocalDate from, LocalDate to) {
    return (root, query, cb) -> {
      var predicate = cb.conjunction();
      if (keyword != null && !keyword.isBlank()) {
        String like = "%" + keyword.toLowerCase() + "%";
        predicate = cb.and(predicate, cb.or(cb.like(cb.lower(root.get("name")), like), cb.like(cb.lower(root.get("email")), like), cb.like(cb.lower(root.get("phone")), like)));
      }
      if (status != null) predicate = cb.and(predicate, cb.equal(root.get("status"), status));
      if (city != null && !city.isBlank()) predicate = cb.and(predicate, cb.equal(cb.lower(root.get("city")), city.toLowerCase()));
      if (serviceType != null && !serviceType.isBlank()) predicate = cb.and(predicate, cb.equal(cb.lower(root.get("serviceType")), serviceType.toLowerCase()));
      if (from != null) predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("eventDate"), from));
      if (to != null) predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("eventDate"), to));
      return predicate;
    };
  }
}
