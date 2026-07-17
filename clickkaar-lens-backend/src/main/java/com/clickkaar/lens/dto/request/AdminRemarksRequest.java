package com.clickkaar.lens.dto.request;

import jakarta.validation.constraints.NotBlank;

public record AdminRemarksRequest(@NotBlank String remarks) {}
