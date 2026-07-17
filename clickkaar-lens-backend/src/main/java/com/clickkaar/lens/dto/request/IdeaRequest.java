package com.clickkaar.lens.dto.request;

import jakarta.validation.constraints.NotBlank;

public record IdeaRequest(@NotBlank String title, @NotBlank String slug, String description, String content, String imageUrl, String category, String occasionCategory, String businessCategory, Boolean featured, Boolean active, String seoTitle, String seoDescription) {}
