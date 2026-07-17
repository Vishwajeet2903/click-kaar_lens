package com.clickkaar.lens.security.jwt;

import com.clickkaar.lens.config.AppProperties;
import com.clickkaar.lens.security.service.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  private final AppProperties properties;
  private final SecretKey key;

  public JwtService(AppProperties properties) {
    this.properties = properties;
    this.key = Keys.hmacShaKeyFor(properties.jwt().secret().getBytes(StandardCharsets.UTF_8));
  }

  public String generateAccessToken(UserPrincipal principal) {
    return generateToken(principal, properties.jwt().expiration(), "access");
  }

  public String generateRefreshToken(UserPrincipal principal) {
    return generateToken(principal, properties.jwt().refreshExpiration(), "refresh");
  }

  public String extractUsername(String token) {
    return claims(token).getSubject();
  }

  public boolean isValid(String token, UserDetails userDetails) {
    return extractUsername(token).equals(userDetails.getUsername()) && claims(token).getExpiration().after(new Date());
  }

  public long accessExpiration() {
    return properties.jwt().expiration();
  }

  private String generateToken(UserPrincipal principal, long ttlMillis, String type) {
    Instant now = Instant.now();
    List<String> roles = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    return Jwts.builder()
        .subject(principal.getUsername())
        .claim("uid", principal.getId())
        .claim("roles", roles)
        .claim("typ", type)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plusMillis(ttlMillis)))
        .signWith(key)
        .compact();
  }

  private Claims claims(String token) {
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
  }
}
