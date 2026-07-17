package com.clickkaar.lens.mapper;

import com.clickkaar.lens.dto.response.UserResponse;
import com.clickkaar.lens.entity.*;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class LensMapper {
  public UserResponse user(User user) {
    Set<String> roles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet());
    return new UserResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone(), user.getProfileImageUrl(), user.isEnabled(), roles);
  }

  public Map<String, Object> category(ServiceCategory category) {
    Map<String, Object> map = base(category);
    map.put("name", category.getName());
    map.put("slug", category.getSlug());
    map.put("shortDescription", category.getShortDescription());
    map.put("description", category.getDescription());
    map.put("imageUrl", category.getImageUrl());
    map.put("iconUrl", category.getIconUrl());
    map.put("startingPrice", category.getStartingPrice());
    map.put("active", category.isActive());
    map.put("featured", category.isFeatured());
    map.put("displayOrder", category.getDisplayOrder());
    map.put("seoTitle", category.getSeoTitle());
    map.put("seoDescription", category.getSeoDescription());
    return map;
  }

  public Map<String, Object> category(OccasionCategory category) {
    Map<String, Object> map = base(category);
    map.put("name", category.getName());
    map.put("slug", category.getSlug());
    map.put("description", category.getDescription());
    map.put("imageUrl", category.getImageUrl());
    map.put("startingPrice", category.getStartingPrice());
    map.put("active", category.isActive());
    map.put("featured", category.isFeatured());
    map.put("displayOrder", category.getDisplayOrder());
    return map;
  }

  public Map<String, Object> category(BusinessCategory category) {
    Map<String, Object> map = base(category);
    map.put("name", category.getName());
    map.put("slug", category.getSlug());
    map.put("description", category.getDescription());
    map.put("imageUrl", category.getImageUrl());
    map.put("startingPrice", category.getStartingPrice());
    map.put("active", category.isActive());
    map.put("featured", category.isFeatured());
    map.put("displayOrder", category.getDisplayOrder());
    return map;
  }

  public Map<String, Object> base(BaseEntity entity) {
    Map<String, Object> map = new LinkedHashMap<>();
    map.put("id", entity.getId());
    map.put("createdAt", entity.getCreatedAt());
    map.put("updatedAt", entity.getUpdatedAt());
    return map;
  }
}
