package com.nhom8.controllers;

import java.util.Optional;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhom8.models.Author;
import com.nhom8.services.AuthorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AuthorController {
    
    @Autowired
    private AuthorService authorService;

    @GetMapping("/api/authors")
    public ResponseEntity<List<Author>> getAllAuthors() {
        try {
            return ResponseEntity.ok(authorService.findAll());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/author")
    public ResponseEntity<Author> createAuthor(@Valid @RequestBody Author req) {
        try {
            authorService.save(req);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/author/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable Long id) {
        try {
            Optional<Author> optionalAuthor = authorService.findById(id);
            Author author = optionalAuthor.get();

            return ResponseEntity.ok(author);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/author/{id}")
    public ResponseEntity<Author> editAuthor(@PathVariable Long id, @Valid @RequestBody Author req) {
        try {
            Optional<Author> optionalAuthor = authorService.findById(id);
            Author author = optionalAuthor.get();
            author.setName(req.getName());
            
            return ResponseEntity.ok(authorService.save(author));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/author/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable Long id) {
        try {
            Optional<Author> optionalAuthor = authorService.findById(id);
            Author author = optionalAuthor.get();
            
            authorService.delete(author);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
