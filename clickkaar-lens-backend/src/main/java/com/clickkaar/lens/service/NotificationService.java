package com.clickkaar.lens.service;

import com.clickkaar.lens.dto.response.PageResponse;
import java.util.Map;
import org.springframework.data.domain.Pageable;

public interface NotificationService {
  PageResponse<Map<String, Object>> notifications(Pageable pageable);
  Map<String, Object> read(Long id);
  void readAll();
}
