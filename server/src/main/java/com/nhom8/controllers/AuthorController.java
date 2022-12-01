package com.nhom8.controllers;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom8.models.Author;
import com.nhom8.services.AuthorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AuthorController {
    
    @Autowired
    private AuthorService authorService;

    @GetMapping("/api/authors")
    public ResponseEntity<Page<Author>> getAuthors(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
        try {
            return ResponseEntity.ok(authorService.getAuthors(page, sortBy));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/allAuthors")
    public ResponseEntity<List<Author>> getAllAuthors() {
        try {
            return ResponseEntity.ok(authorService.getAllAuthors());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/author")
    public ResponseEntity<Author> createAuthor(@Valid @RequestBody Author author) {
        try {
            return ResponseEntity.ok(authorService.createAuthor(author));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/author/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(authorService.getAuthor(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/author/{id}")
    public ResponseEntity<Author> editAuthor(@PathVariable Long id, @Valid @RequestBody Author editedAuthor) {
        try {
            return ResponseEntity.ok(authorService.editAuthor(id, editedAuthor));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/author/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(authorService.deleteAuthor(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
}
