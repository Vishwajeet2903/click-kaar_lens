package com.clickkaar.lens.service;

import com.clickkaar.lens.dto.request.CategoryRequest;
import java.util.List;
import java.util.Map;

public interface CategoryService {
  List<Map<String, Object>> services();
  Map<String, Object> service(String slug);
  Map<String, Object> createService(CategoryRequest request);
  Map<String, Object> updateService(Long id, CategoryRequest request);
  void deleteService(Long id);
  List<Map<String, Object>> occasions();
  Map<String, Object> occasion(String slug);
  Map<String, Object> createOccasion(CategoryRequest request);
  Map<String, Object> updateOccasion(Long id, CategoryRequest request);
  void deleteOccasion(Long id);
  List<Map<String, Object>> businesses();
  Map<String, Object> business(String slug);
  Map<String, Object> createBusiness(CategoryRequest request);
  Map<String, Object> updateBusiness(Long id, CategoryRequest request);
  void deleteBusiness(Long id);
}
