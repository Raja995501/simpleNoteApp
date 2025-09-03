// backend/src/main/java/com/example/notes/NotesApplication.java
package com.example.notes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.notes")
@EntityScan(basePackages = "com.example.notes.model")
@EnableJpaRepositories(basePackages = "com.example.notes.repo")
public class NotesApplication {
  public static void main(String[] args) {
    SpringApplication.run(NotesApplication.class, args);
  }
}
