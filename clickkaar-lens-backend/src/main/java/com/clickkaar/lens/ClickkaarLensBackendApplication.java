package com.clickkaar.lens;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ClickkaarLensBackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(ClickkaarLensBackendApplication.class, args);
  }
}
