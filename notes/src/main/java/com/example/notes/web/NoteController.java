
package com.example.notes.web;

import com.example.notes.model.Note;
import com.example.notes.repo.NoteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/notes", "/api/notes/"}) // support both with/without trailing slash
public class NoteController {
  private final NoteRepository repo;
  public NoteController(NoteRepository repo) { this.repo = repo; }

  @GetMapping
  public List<Note> list() { return repo.findAll(); }

  @GetMapping("/{id}")
  public Note get(@PathVariable Long id) {
    return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  public Note create(@RequestBody Note n) {
    if (n.getIsPublic() && (n.getSlug() == null || n.getSlug().isBlank())) {
      n.setSlug(UUID.randomUUID().toString());
    }
    return repo.save(n);
  }

  @PutMapping("/{id}")
  public Note update(@PathVariable Long id, @RequestBody Note n) {
    Note e = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    e.setTitle(n.getTitle());
    e.setContent(n.getContent());
    e.setIsPublic(n.getIsPublic());
    if (e.getIsPublic() && (e.getSlug() == null || e.getSlug().isBlank())) {
      e.setSlug(UUID.randomUUID().toString());
    }
    if (!e.getIsPublic()) e.setSlug(null);
    return repo.save(e);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    if (!repo.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    repo.deleteById(id);
  }
}
