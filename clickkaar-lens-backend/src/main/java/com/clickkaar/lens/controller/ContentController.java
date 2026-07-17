package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.request.*;
import com.clickkaar.lens.dto.response.*;
import com.clickkaar.lens.service.ContentService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ContentController {
  private final ContentService service;
  @GetMapping("/api/v1/blogs") ApiResponse<PageResponse<Map<String, Object>>> blogs(Pageable pageable) { return ApiResponse.ok("Blogs fetched", service.blogs(pageable)); }
  @GetMapping("/api/v1/blogs/featured") ApiResponse<List<Map<String, Object>>> featured() { return ApiResponse.ok("Featured blogs fetched", service.featuredBlogs()); }
  @GetMapping("/api/v1/blogs/categories") ApiResponse<List<Map<String, Object>>> categories() { return ApiResponse.ok("Blog categories fetched", service.blogCategories()); }
  @GetMapping("/api/v1/blogs/tags") ApiResponse<List<Map<String, Object>>> tags() { return ApiResponse.ok("Blog tags fetched", service.blogTags()); }
  @GetMapping("/api/v1/blogs/{slug}") ApiResponse<Map<String, Object>> blog(@PathVariable String slug) { return ApiResponse.ok("Blog fetched", service.blog(slug)); }
  @PostMapping("/api/v1/admin/blogs") ApiResponse<Map<String, Object>> createBlog(@Valid @RequestBody BlogRequest request) { return ApiResponse.created("Blog created", service.createBlog(request)); }
  @PutMapping("/api/v1/admin/blogs/{id}") ApiResponse<Map<String, Object>> updateBlog(@PathVariable Long id, @Valid @RequestBody BlogRequest request) { return ApiResponse.ok("Blog updated", service.updateBlog(id, request)); }
  @PatchMapping("/api/v1/admin/blogs/{id}/publish") ApiResponse<Map<String, Object>> publish(@PathVariable Long id) { return ApiResponse.ok("Blog publish state updated", service.publishBlog(id)); }
  @DeleteMapping("/api/v1/admin/blogs/{id}") ApiResponse<Void> deleteBlog(@PathVariable Long id) { service.deleteBlog(id); return ApiResponse.ok("Blog deleted", null); }
  @GetMapping("/api/v1/ideas") ApiResponse<PageResponse<Map<String, Object>>> ideas(Pageable pageable) { return ApiResponse.ok("Ideas fetched", service.ideas(pageable)); }
  @GetMapping("/api/v1/ideas/{slug}") ApiResponse<Map<String, Object>> idea(@PathVariable String slug) { return ApiResponse.ok("Idea fetched", service.idea(slug)); }
  @PostMapping("/api/v1/admin/ideas") ApiResponse<Map<String, Object>> createIdea(@Valid @RequestBody IdeaRequest request) { return ApiResponse.created("Idea created", service.createIdea(request)); }
  @PutMapping("/api/v1/admin/ideas/{id}") ApiResponse<Map<String, Object>> updateIdea(@PathVariable Long id, @Valid @RequestBody IdeaRequest request) { return ApiResponse.ok("Idea updated", service.updateIdea(id, request)); }
  @DeleteMapping("/api/v1/admin/ideas/{id}") ApiResponse<Void> deleteIdea(@PathVariable Long id) { service.deleteIdea(id); return ApiResponse.ok("Idea deleted", null); }
}
