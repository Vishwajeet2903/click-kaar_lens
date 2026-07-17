package com.clickkaar.lens.service;

import static org.junit.jupiter.api.Assertions.assertThrows;

import com.clickkaar.lens.dto.request.RegisterRequest;
import com.clickkaar.lens.exception.BadRequestException;
import com.clickkaar.lens.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.Test;

class AuthServiceImplTest {
  @Test
  void registerRejectsPasswordMismatch() {
    AuthService service = new AuthServiceImpl(null, null, null, null, null, null);
    assertThrows(BadRequestException.class, () -> service.register(new RegisterRequest("A", "B", "a@b.com", "9876543210", "Password@1", "Password@2")));
  }
}
