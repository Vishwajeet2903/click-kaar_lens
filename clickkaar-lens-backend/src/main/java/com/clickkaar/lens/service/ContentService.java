package com.clickkaar.lens.service;

import com.clickkaar.lens.dto.request.BlogRequest;
import com.clickkaar.lens.dto.request.IdeaRequest;
import com.clickkaar.lens.dto.response.PageResponse;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;

public interface ContentService {
  PageResponse<Map<String, Object>> blogs(Pageable pageable);
  Map<String, Object> blog(String slug);
  List<Map<String, Object>> featuredBlogs();
  List<Map<String, Object>> blogCategories();
  List<Map<String, Object>> blogTags();
  Map<String, Object> createBlog(BlogRequest request);
  Map<String, Object> updateBlog(Long id, BlogRequest request);
  Map<String, Object> publishBlog(Long id);
  void deleteBlog(Long id);
  PageResponse<Map<String, Object>> ideas(Pageable pageable);
  Map<String, Object> idea(String slug);
  Map<String, Object> createIdea(IdeaRequest request);
  Map<String, Object> updateIdea(Long id, IdeaRequest request);
  void deleteIdea(Long id);
}
