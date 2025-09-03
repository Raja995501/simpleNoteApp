
package com.example.notes.web;

import com.example.notes.model.Note;
import com.example.notes.repo.NoteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping({"/api/public", "/api/public/"})
public class PublicController {
  private final NoteRepository repo;
  public PublicController(NoteRepository repo) { this.repo = repo; }

  @GetMapping("/{slug}")
  public Note view(@PathVariable String slug) {
    Note n = repo.findBySlug(slug).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    if (!n.getIsPublic()) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    return n;
  }
}
