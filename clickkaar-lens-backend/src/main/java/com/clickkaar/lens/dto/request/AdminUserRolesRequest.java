package com.clickkaar.lens.dto.request;

import com.clickkaar.lens.enums.RoleName;
import jakarta.validation.constraints.NotEmpty;
import java.util.Set;

public record AdminUserRolesRequest(@NotEmpty Set<RoleName> roles) {}
