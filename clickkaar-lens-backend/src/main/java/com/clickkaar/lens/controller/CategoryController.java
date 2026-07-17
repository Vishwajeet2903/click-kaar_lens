package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.request.CategoryRequest;
import com.clickkaar.lens.dto.response.ApiResponse;
import com.clickkaar.lens.service.CategoryService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CategoryController {
  private final CategoryService categoryService;

  @GetMapping("/api/v1/services") ApiResponse<List<Map<String, Object>>> services() { return ApiResponse.ok("Services fetched", categoryService.services()); }
  @GetMapping("/api/v1/services/{slug}") ApiResponse<Map<String, Object>> service(@PathVariable String slug) { return ApiResponse.ok("Service fetched", categoryService.service(slug)); }
  @GetMapping("/api/v1/occasions") ApiResponse<List<Map<String, Object>>> occasions() { return ApiResponse.ok("Occasions fetched", categoryService.occasions()); }
  @GetMapping("/api/v1/occasions/{slug}") ApiResponse<Map<String, Object>> occasion(@PathVariable String slug) { return ApiResponse.ok("Occasion fetched", categoryService.occasion(slug)); }
  @GetMapping("/api/v1/business") ApiResponse<List<Map<String, Object>>> businesses() { return ApiResponse.ok("Business categories fetched", categoryService.businesses()); }
  @GetMapping("/api/v1/business/{slug}") ApiResponse<Map<String, Object>> business(@PathVariable String slug) { return ApiResponse.ok("Business category fetched", categoryService.business(slug)); }
  @PostMapping("/api/v1/admin/services") ApiResponse<Map<String, Object>> createService(@Valid @RequestBody CategoryRequest request) { return ApiResponse.created("Service created", categoryService.createService(request)); }
  @PutMapping("/api/v1/admin/services/{id}") ApiResponse<Map<String, Object>> updateService(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) { return ApiResponse.ok("Service updated", categoryService.updateService(id, request)); }
  @DeleteMapping("/api/v1/admin/services/{id}") ApiResponse<Void> deleteService(@PathVariable Long id) { categoryService.deleteService(id); return ApiResponse.ok("Service deleted", null); }
  @PostMapping("/api/v1/admin/occasions") ApiResponse<Map<String, Object>> createOccasion(@Valid @RequestBody CategoryRequest request) { return ApiResponse.created("Occasion created", categoryService.createOccasion(request)); }
  @PutMapping("/api/v1/admin/occasions/{id}") ApiResponse<Map<String, Object>> updateOccasion(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) { return ApiResponse.ok("Occasion updated", categoryService.updateOccasion(id, request)); }
  @DeleteMapping("/api/v1/admin/occasions/{id}") ApiResponse<Void> deleteOccasion(@PathVariable Long id) { categoryService.deleteOccasion(id); return ApiResponse.ok("Occasion deleted", null); }
  @PostMapping("/api/v1/admin/business") ApiResponse<Map<String, Object>> createBusiness(@Valid @RequestBody CategoryRequest request) { return ApiResponse.created("Business category created", categoryService.createBusiness(request)); }
  @PutMapping("/api/v1/admin/business/{id}") ApiResponse<Map<String, Object>> updateBusiness(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) { return ApiResponse.ok("Business category updated", categoryService.updateBusiness(id, request)); }
  @DeleteMapping("/api/v1/admin/business/{id}") ApiResponse<Void> deleteBusiness(@PathVariable Long id) { categoryService.deleteBusiness(id); return ApiResponse.ok("Business category deleted", null); }
}
