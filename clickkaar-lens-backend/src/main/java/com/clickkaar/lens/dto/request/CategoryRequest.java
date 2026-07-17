package com.clickkaar.lens.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

public record CategoryRequest(
    @NotBlank String name,
    @NotBlank String slug,
    String shortDescription,
    String description,
    String imageUrl,
    String iconUrl,
    BigDecimal startingPrice,
    Boolean active,
    Boolean featured,
    @PositiveOrZero Integer displayOrder,
    String seoTitle,
    String seoDescription
) {}
