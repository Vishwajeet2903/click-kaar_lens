package com.clickkaar.lens.controller;

import com.clickkaar.lens.dto.response.ApiResponse;
import com.clickkaar.lens.service.FileStorageService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {
  private final FileStorageService service;
  @PostMapping("/{folder}") ApiResponse<Map<String, String>> upload(@PathVariable String folder, @RequestParam MultipartFile file) {
    return ApiResponse.created("File uploaded", Map.of("url", service.store(file, folder)));
  }
}
