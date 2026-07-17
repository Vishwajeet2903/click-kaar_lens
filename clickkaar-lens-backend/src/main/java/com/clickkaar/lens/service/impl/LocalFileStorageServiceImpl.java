package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.config.AppProperties;
import com.clickkaar.lens.exception.FileStorageException;
import com.clickkaar.lens.service.FileStorageService;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class LocalFileStorageServiceImpl implements FileStorageService {
  private static final Set<String> ALLOWED = Set.of("image/jpeg", "image/png", "image/webp", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  private final AppProperties properties;

  public String store(MultipartFile file, String folder) {
    if (file == null || file.isEmpty()) throw new FileStorageException("File is empty");
    if (!ALLOWED.contains(file.getContentType())) throw new FileStorageException("Unsupported file type");
    try {
      Path dir = Path.of(properties.storage().uploadDir(), folder == null ? "misc" : folder).normalize();
      Files.createDirectories(dir);
      String name = UUID.randomUUID() + "-" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9._-]", "_");
      Path target = dir.resolve(name);
      file.transferTo(target);
      return properties.storage().publicBaseUrl() + "/" + dir.getFileName() + "/" + name;
    } catch (Exception ex) {
      throw new FileStorageException("Could not store file", ex);
    }
  }
}
