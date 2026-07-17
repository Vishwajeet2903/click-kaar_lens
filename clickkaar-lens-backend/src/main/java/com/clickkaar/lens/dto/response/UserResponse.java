package com.clickkaar.lens.dto.response;

import java.util.Set;

public record UserResponse(Long id, String firstName, String lastName, String email, String phone, String profileImageUrl, boolean enabled, Set<String> roles) {}
