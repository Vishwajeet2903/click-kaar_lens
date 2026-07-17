package com.clickkaar.lens.service;

import java.util.List;
import java.util.Map;

public interface LocationService {
  List<Map<String, Object>> states();
  List<Map<String, Object>> cities(Long stateId);
  List<Map<String, Object>> searchCities(String keyword);
}
