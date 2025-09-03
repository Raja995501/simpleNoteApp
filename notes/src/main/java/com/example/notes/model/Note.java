
package com.example.notes.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Note {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(columnDefinition = "text")
  private String content;

  private boolean isPublic;

  @Column(unique = true)
  private String slug;

  private Instant createdAt;
  private Instant updatedAt;

  @PrePersist
  void onCreate() { createdAt = Instant.now(); updatedAt = createdAt; }

  @PreUpdate
  void onUpdate() { updatedAt = Instant.now(); }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }

  public String getContent() { return content; }
  public void setContent(String content) { this.content = content; }

  @JsonProperty("isPublic")
  public boolean getIsPublic() { return isPublic; }

  @JsonProperty("isPublic")
  public void setIsPublic(boolean isPublic) { this.isPublic = isPublic; }

  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }

  public Instant getCreatedAt() { return createdAt; }
  public Instant getUpdatedAt() { return updatedAt; }
}
