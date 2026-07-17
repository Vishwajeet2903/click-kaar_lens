package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.City;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
  List<City> findByStateIdAndActiveTrueOrderByNameAsc(Long stateId);
  List<City> findTop20ByNameContainingIgnoreCaseAndActiveTrue(String keyword);
}
