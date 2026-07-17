package com.clickkaar.lens.service.impl;

import com.clickkaar.lens.dto.response.PageResponse;
import com.clickkaar.lens.entity.Notification;
import com.clickkaar.lens.mapper.LensMapper;
import com.clickkaar.lens.repository.NotificationRepository;
import com.clickkaar.lens.service.NotificationService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
  private final NotificationRepository repository;
  private final LensMapper mapper;
  public PageResponse<Map<String, Object>> notifications(Pageable pageable) { return PageResponse.from(repository.findAll(pageable).map(this::view)); }
  @Transactional public Map<String, Object> read(Long id) { Notification n = repository.findById(id).orElseThrow(); n.setRead(true); return view(n); }
  @Transactional public void readAll() { repository.findAll().forEach(n -> n.setRead(true)); }
  private Map<String, Object> view(Notification n) { Map<String, Object> m = mapper.base(n); m.put("title", n.getTitle()); m.put("message", n.getMessage()); m.put("type", n.getType()); m.put("read", n.isRead()); return m; }
}
