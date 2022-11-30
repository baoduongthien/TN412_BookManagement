package com.nhom8.controllers;

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

import com.nhom8.models.Publisher;
import com.nhom8.services.PublisherService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PublisherController {
    
    @Autowired
    private PublisherService publisherService;

    @GetMapping("/api/publishers")
    public ResponseEntity<Page<Publisher>> getAllPublishers(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
        try {
            return ResponseEntity.ok(publisherService.getAllPublishers(page, sortBy));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/publisher")
    public ResponseEntity<Publisher> createPublisher(@Valid @RequestBody Publisher publisher) {
        try {
            return ResponseEntity.ok(publisherService.createPublisher(publisher));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/publisher/{id}")
    public ResponseEntity<Publisher> getPublisher(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(publisherService.getPublisher(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/publisher/{id}")
    public ResponseEntity<Publisher> editPublisher(@PathVariable Long id, @Valid @RequestBody Publisher editedPublisher) {
        try {
            return ResponseEntity.ok(publisherService.editPublisher(id, editedPublisher));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/publisher/{id}")
    public ResponseEntity<Publisher> deletePublisher(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(publisherService.deletePublisher(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
}
