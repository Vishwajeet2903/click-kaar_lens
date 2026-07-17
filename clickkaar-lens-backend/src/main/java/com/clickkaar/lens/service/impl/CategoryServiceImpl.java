package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.dto.request.CategoryRequest;
import com.clickkaar.lens.entity.BusinessCategory;
import com.clickkaar.lens.entity.OccasionCategory;
import com.clickkaar.lens.entity.ServiceCategory;
import com.clickkaar.lens.exception.ResourceNotFoundException;
import com.clickkaar.lens.mapper.LensMapper;
import com.clickkaar.lens.repository.BusinessCategoryRepository;
import com.clickkaar.lens.repository.OccasionCategoryRepository;
import com.clickkaar.lens.repository.ServiceCategoryRepository;
import com.clickkaar.lens.service.CategoryService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final ServiceCategoryRepository serviceCategoryRepository;
  private final OccasionCategoryRepository occasionCategoryRepository;
  private final BusinessCategoryRepository businessCategoryRepository;
  private final LensMapper mapper;

  public List<Map<String, Object>> services() { return serviceCategoryRepository.findAll().stream().filter(ServiceCategory::isActive).map(mapper::category).toList(); }
  public Map<String, Object> service(String slug) { return mapper.category(serviceCategoryRepository.findBySlugAndActiveTrue(slug).orElseThrow(() -> new ResourceNotFoundException("Service not found"))); }
  public List<Map<String, Object>> occasions() { return occasionCategoryRepository.findAll().stream().filter(OccasionCategory::isActive).map(mapper::category).toList(); }
  public Map<String, Object> occasion(String slug) { return mapper.category(occasionCategoryRepository.findBySlugAndActiveTrue(slug).orElseThrow(() -> new ResourceNotFoundException("Occasion not found"))); }
  public List<Map<String, Object>> businesses() { return businessCategoryRepository.findAll().stream().filter(BusinessCategory::isActive).map(mapper::category).toList(); }
  public Map<String, Object> business(String slug) { return mapper.category(businessCategoryRepository.findBySlugAndActiveTrue(slug).orElseThrow(() -> new ResourceNotFoundException("Business category not found"))); }

  @Transactional public Map<String, Object> createService(CategoryRequest request) { return mapper.category(serviceCategoryRepository.save(apply(new ServiceCategory(), request))); }
  @Transactional public Map<String, Object> updateService(Long id, CategoryRequest request) { return mapper.category(apply(serviceCategoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service not found")), request)); }
  @Transactional public void deleteService(Long id) { serviceCategoryRepository.deleteById(id); }
  @Transactional public Map<String, Object> createOccasion(CategoryRequest request) { return mapper.category(occasionCategoryRepository.save(apply(new OccasionCategory(), request))); }
  @Transactional public Map<String, Object> updateOccasion(Long id, CategoryRequest request) { return mapper.category(apply(occasionCategoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Occasion not found")), request)); }
  @Transactional public void deleteOccasion(Long id) { occasionCategoryRepository.deleteById(id); }
  @Transactional public Map<String, Object> createBusiness(CategoryRequest request) { return mapper.category(businessCategoryRepository.save(apply(new BusinessCategory(), request))); }
  @Transactional public Map<String, Object> updateBusiness(Long id, CategoryRequest request) { return mapper.category(apply(businessCategoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Business category not found")), request)); }
  @Transactional public void deleteBusiness(Long id) { businessCategoryRepository.deleteById(id); }

  private ServiceCategory apply(ServiceCategory c, CategoryRequest r) {
    c.setName(r.name()); c.setSlug(r.slug()); c.setShortDescription(r.shortDescription()); c.setDescription(r.description()); c.setImageUrl(r.imageUrl()); c.setIconUrl(r.iconUrl()); c.setStartingPrice(r.startingPrice()); c.setSeoTitle(r.seoTitle()); c.setSeoDescription(r.seoDescription());
    if (r.active() != null) c.setActive(r.active()); if (r.featured() != null) c.setFeatured(r.featured()); if (r.displayOrder() != null) c.setDisplayOrder(r.displayOrder()); return c;
  }

  private OccasionCategory apply(OccasionCategory c, CategoryRequest r) {
    c.setName(r.name()); c.setSlug(r.slug()); c.setDescription(r.description()); c.setImageUrl(r.imageUrl()); c.setStartingPrice(r.startingPrice());
    if (r.active() != null) c.setActive(r.active()); if (r.featured() != null) c.setFeatured(r.featured()); if (r.displayOrder() != null) c.setDisplayOrder(r.displayOrder()); return c;
  }

  private BusinessCategory apply(BusinessCategory c, CategoryRequest r) {
    c.setName(r.name()); c.setSlug(r.slug()); c.setDescription(r.description()); c.setImageUrl(r.imageUrl()); c.setStartingPrice(r.startingPrice());
    if (r.active() != null) c.setActive(r.active()); if (r.featured() != null) c.setFeatured(r.featured()); if (r.displayOrder() != null) c.setDisplayOrder(r.displayOrder()); return c;
  }
}
