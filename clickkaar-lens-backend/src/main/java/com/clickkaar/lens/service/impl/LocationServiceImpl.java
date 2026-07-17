package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.entity.City;
import com.clickkaar.lens.entity.State;
import com.clickkaar.lens.repository.CityRepository;
import com.clickkaar.lens.repository.StateRepository;
import com.clickkaar.lens.service.LocationService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
  private final StateRepository stateRepository;
  private final CityRepository cityRepository;
  public List<Map<String, Object>> states() { return stateRepository.findByActiveTrueOrderByNameAsc().stream().map(this::view).toList(); }
  public List<Map<String, Object>> cities(Long stateId) { return cityRepository.findByStateIdAndActiveTrueOrderByNameAsc(stateId).stream().map(this::view).toList(); }
  public List<Map<String, Object>> searchCities(String keyword) { return cityRepository.findTop20ByNameContainingIgnoreCaseAndActiveTrue(keyword == null ? "" : keyword).stream().map(this::view).toList(); }
  private Map<String, Object> view(State s) { return Map.of("id", s.getId(), "name", s.getName(), "code", s.getCode()); }
  private Map<String, Object> view(City c) { return Map.of("id", c.getId(), "name", c.getName(), "stateId", c.getState().getId(), "serviceAvailable", c.isServiceAvailable()); }
}
