package com.clickkaar.lens.exception;

import com.clickkaar.lens.dto.response.ApiResponse;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  ResponseEntity<ApiResponse<Void>> notFound(ResourceNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(ex.getMessage(), null, HttpStatus.NOT_FOUND));
  }

  @ExceptionHandler({BadRequestException.class, DuplicateResourceException.class, InvalidTokenException.class})
  ResponseEntity<ApiResponse<Void>> badRequest(RuntimeException ex) {
    return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage(), null, HttpStatus.BAD_REQUEST));
  }

  @ExceptionHandler({UnauthorizedException.class, AccountDisabledException.class})
  ResponseEntity<ApiResponse<Void>> unauthorized(RuntimeException ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(ex.getMessage(), null, HttpStatus.UNAUTHORIZED));
  }

  @ExceptionHandler(ForbiddenException.class)
  ResponseEntity<ApiResponse<Void>> forbidden(ForbiddenException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.error(ex.getMessage(), null, HttpStatus.FORBIDDEN));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ApiResponse<Map<String, String>>> validation(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new LinkedHashMap<>();
    for (FieldError error : ex.getBindingResult().getFieldErrors()) {
      errors.put(error.getField(), error.getDefaultMessage());
    }
    return ResponseEntity.badRequest().body(ApiResponse.error("Validation failed", errors, HttpStatus.BAD_REQUEST));
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ApiResponse<Void>> unexpected(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error("Unexpected server error", null, HttpStatus.INTERNAL_SERVER_ERROR));
  }
}
