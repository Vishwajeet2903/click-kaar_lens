package com.clickkaar.lens.dto.response;

import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;

public record ApiResponse<T>(boolean success, String message, T data, LocalDateTime timestamp, int statusCode) {
  public static <T> ApiResponse<T> ok(String message, T data) {
    return new ApiResponse<>(true, message, data, LocalDateTime.now(), HttpStatus.OK.value());
  }

  public static <T> ApiResponse<T> created(String message, T data) {
    return new ApiResponse<>(true, message, data, LocalDateTime.now(), HttpStatus.CREATED.value());
  }

  public static <T> ApiResponse<T> error(String message, T data, HttpStatus status) {
    return new ApiResponse<>(false, message, data, LocalDateTime.now(), status.value());
  }
}
