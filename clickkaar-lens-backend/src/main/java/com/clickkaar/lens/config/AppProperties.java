package com.clickkaar.lens.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(String frontendUrl, Jwt jwt, Admin admin, Storage storage) {
  public record Jwt(String secret, long expiration, long refreshExpiration) {}
  public record Admin(String email, String password) {}
  public record Storage(String uploadDir, String publicBaseUrl) {}
}
