package com.clickkaar.lens.dto.request;

import jakarta.validation.constraints.NotBlank;

public record AdminAssignRequest(@NotBlank String assignedTo) {}
