package com.clickkaar.lens.config;

import com.clickkaar.lens.entity.*;
import com.clickkaar.lens.enums.RoleName;
import com.clickkaar.lens.repository.*;
import java.math.BigDecimal;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
  private final AppProperties properties;
  private final RoleRepository roles;
  private final UserRepository users;
  private final ServiceCategoryRepository services;
  private final OccasionCategoryRepository occasions;
  private final BusinessCategoryRepository businesses;
  private final StateRepository states;
  private final CityRepository cities;
  private final PasswordEncoder passwordEncoder;

  @Override
  @Transactional
  public void run(String... args) {
    for (RoleName name : RoleName.values()) roles.findByName(name).orElseGet(() -> { Role r = new Role(); r.setName(name); return roles.save(r); });
    if (!users.existsByEmailIgnoreCase(properties.admin().email())) {
      User admin = new User();
      admin.setFirstName("CLICK-KAAR");
      admin.setLastName("Admin");
      admin.setEmail(properties.admin().email().toLowerCase());
      admin.setPhone("9999999999");
      admin.setPassword(passwordEncoder.encode(properties.admin().password()));
      admin.setEmailVerified(true);
      admin.setRoles(Set.of(roles.findByName(RoleName.ROLE_ADMIN).orElseThrow()));
      users.save(admin);
    }
    if (services.count() == 0) {
      service("Photography", "photography", "Full-service photography", BigDecimal.valueOf(4999));
      service("Videography", "videography", "Video production and reels", BigDecimal.valueOf(7999));
    }
    if (occasions.count() == 0) {
      occasion("Wedding", "wedding"); occasion("Pre-wedding", "pre-wedding"); occasion("Maternity", "maternity"); occasion("Birthday", "birthday");
    }
    if (businesses.count() == 0) {
      business("Product photography", "product-photography"); business("Food photography", "food-photography"); business("Corporate photography", "corporate-photography");
    }
    if (states.count() == 0) {
      State mh = state("Maharashtra", "MH"); State ka = state("Karnataka", "KA"); city("Mumbai", mh); city("Pune", mh); city("Bengaluru", ka);
    }
  }

  private void service(String name, String slug, String description, BigDecimal price) { ServiceCategory c = new ServiceCategory(); c.setName(name); c.setSlug(slug); c.setDescription(description); c.setStartingPrice(price); services.save(c); }
  private void occasion(String name, String slug) { OccasionCategory c = new OccasionCategory(); c.setName(name); c.setSlug(slug); c.setStartingPrice(BigDecimal.valueOf(4999)); occasions.save(c); }
  private void business(String name, String slug) { BusinessCategory c = new BusinessCategory(); c.setName(name); c.setSlug(slug); c.setStartingPrice(BigDecimal.valueOf(5999)); businesses.save(c); }
  private State state(String name, String code) { State s = new State(); s.setName(name); s.setCode(code); return states.save(s); }
  private void city(String name, State state) { City c = new City(); c.setName(name); c.setState(state); cities.save(c); }
}
