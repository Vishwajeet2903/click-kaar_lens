package com.clickkaar.lens.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.Set;

public record BlogRequest(@NotBlank String title, @NotBlank String slug, String excerpt, @NotBlank String content, String featuredImageUrl, String author, String categorySlug, Set<String> tagSlugs, Boolean featured, Boolean published, String seoTitle, String seoDescription) {}
