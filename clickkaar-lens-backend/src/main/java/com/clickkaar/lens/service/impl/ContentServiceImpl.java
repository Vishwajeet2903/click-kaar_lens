package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.dto.request.BlogRequest;
import com.clickkaar.lens.dto.request.IdeaRequest;
import com.clickkaar.lens.dto.response.PageResponse;
import com.clickkaar.lens.entity.*;
import com.clickkaar.lens.exception.ResourceNotFoundException;
import com.clickkaar.lens.mapper.LensMapper;
import com.clickkaar.lens.repository.*;
import com.clickkaar.lens.service.ContentService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {
  private final BlogRepository blogRepository;
  private final BlogCategoryRepository blogCategoryRepository;
  private final BlogTagRepository blogTagRepository;
  private final IdeaRepository ideaRepository;
  private final LensMapper mapper;

  public PageResponse<Map<String, Object>> blogs(Pageable pageable) { return PageResponse.from(blogRepository.findByPublishedTrue(pageable).map(this::blogView)); }
  @Transactional public Map<String, Object> blog(String slug) { Blog b = blogRepository.findBySlugAndPublishedTrue(slug).orElseThrow(() -> new ResourceNotFoundException("Blog not found")); b.setViewCount(b.getViewCount() + 1); return blogView(b); }
  public List<Map<String, Object>> featuredBlogs() { return blogRepository.findTop6ByPublishedTrueAndFeaturedTrueOrderByPublishedAtDesc().stream().map(this::blogView).toList(); }
  public List<Map<String, Object>> blogCategories() { return blogCategoryRepository.findAll().stream().map(c -> Map.<String, Object>of("id", c.getId(), "name", c.getName(), "slug", c.getSlug())).toList(); }
  public List<Map<String, Object>> blogTags() { return blogTagRepository.findAll().stream().map(t -> Map.<String, Object>of("id", t.getId(), "name", t.getName(), "slug", t.getSlug())).toList(); }
  @Transactional public Map<String, Object> createBlog(BlogRequest r) { return blogView(blogRepository.save(apply(new Blog(), r))); }
  @Transactional public Map<String, Object> updateBlog(Long id, BlogRequest r) { return blogView(apply(blogRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Blog not found")), r)); }
  @Transactional public Map<String, Object> publishBlog(Long id) { Blog b = blogRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Blog not found")); b.setPublished(!b.isPublished()); b.setPublishedAt(b.isPublished() ? LocalDateTime.now() : null); return blogView(b); }
  @Transactional public void deleteBlog(Long id) { blogRepository.deleteById(id); }
  public PageResponse<Map<String, Object>> ideas(Pageable pageable) { return PageResponse.from(ideaRepository.findByActiveTrue(pageable).map(this::ideaView)); }
  public Map<String, Object> idea(String slug) { return ideaView(ideaRepository.findBySlugAndActiveTrue(slug).orElseThrow(() -> new ResourceNotFoundException("Idea not found"))); }
  @Transactional public Map<String, Object> createIdea(IdeaRequest r) { return ideaView(ideaRepository.save(apply(new Idea(), r))); }
  @Transactional public Map<String, Object> updateIdea(Long id, IdeaRequest r) { return ideaView(apply(ideaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Idea not found")), r)); }
  @Transactional public void deleteIdea(Long id) { ideaRepository.deleteById(id); }

  private Blog apply(Blog b, BlogRequest r) { b.setTitle(r.title()); b.setSlug(r.slug()); b.setExcerpt(r.excerpt()); b.setContent(r.content()); b.setFeaturedImageUrl(r.featuredImageUrl()); b.setAuthor(r.author()); b.setFeatured(Boolean.TRUE.equals(r.featured())); b.setPublished(Boolean.TRUE.equals(r.published())); b.setPublishedAt(b.isPublished() ? LocalDateTime.now() : null); b.setSeoTitle(r.seoTitle()); b.setSeoDescription(r.seoDescription()); r.categorySlug(); return b; }
  private Idea apply(Idea i, IdeaRequest r) { i.setTitle(r.title()); i.setSlug(r.slug()); i.setDescription(r.description()); i.setContent(r.content()); i.setImageUrl(r.imageUrl()); i.setCategory(r.category()); i.setOccasionCategory(r.occasionCategory()); i.setBusinessCategory(r.businessCategory()); i.setFeatured(Boolean.TRUE.equals(r.featured())); i.setActive(r.active() == null || r.active()); i.setSeoTitle(r.seoTitle()); i.setSeoDescription(r.seoDescription()); return i; }
  private Map<String, Object> blogView(Blog b) { Map<String, Object> m = mapper.base(b); m.put("title", b.getTitle()); m.put("slug", b.getSlug()); m.put("excerpt", b.getExcerpt()); m.put("content", b.getContent()); m.put("featuredImageUrl", b.getFeaturedImageUrl()); m.put("author", b.getAuthor()); m.put("featured", b.isFeatured()); m.put("published", b.isPublished()); m.put("publishedAt", b.getPublishedAt()); m.put("viewCount", b.getViewCount()); return m; }
  private Map<String, Object> ideaView(Idea i) { Map<String, Object> m = mapper.base(i); m.put("title", i.getTitle()); m.put("slug", i.getSlug()); m.put("description", i.getDescription()); m.put("content", i.getContent()); m.put("imageUrl", i.getImageUrl()); m.put("category", i.getCategory()); m.put("featured", i.isFeatured()); m.put("active", i.isActive()); return m; }
}
