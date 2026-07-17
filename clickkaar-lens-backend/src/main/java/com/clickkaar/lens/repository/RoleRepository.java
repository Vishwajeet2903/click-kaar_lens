package com.clickkaar.lens.repository;

import com.clickkaar.lens.entity.Role;
import com.clickkaar.lens.enums.RoleName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(RoleName name);
}
