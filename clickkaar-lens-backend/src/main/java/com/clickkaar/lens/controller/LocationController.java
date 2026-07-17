package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.response.ApiResponse;
import com.clickkaar.lens.service.LocationService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/locations")
@RequiredArgsConstructor
public class LocationController {
  private final LocationService service;
  @GetMapping("/states") ApiResponse<List<Map<String, Object>>> states() { return ApiResponse.ok("States fetched", service.states()); }
  @GetMapping("/states/{stateId}/cities") ApiResponse<List<Map<String, Object>>> cities(@PathVariable Long stateId) { return ApiResponse.ok("Cities fetched", service.cities(stateId)); }
  @GetMapping("/cities/search") ApiResponse<List<Map<String, Object>>> search(@RequestParam(defaultValue = "") String q) { return ApiResponse.ok("Cities fetched", service.searchCities(q)); }
}
