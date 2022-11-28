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

import com.nhom8.models.Publisher;
import com.nhom8.services.PublisherService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PublisherController {
    
    @Autowired
    private PublisherService publisherService;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/publishers")
    public ResponseEntity<List<Publisher>> getAllCategories() {
        try {
            return ResponseEntity.ok(publisherService.findAll());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/publisher")
    public ResponseEntity<Publisher> createPublisher(@Valid @RequestBody Publisher req) {
        try {
            publisherService.save(req);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/publisher/{id}")
    public ResponseEntity<Publisher> getPublisher(@PathVariable Long id) {
        try {
            Optional<Publisher> optionalPublisher = publisherService.findById(id);
            Publisher publisher = optionalPublisher.get();

            return ResponseEntity.ok(publisher);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/publisher/{id}")
    public ResponseEntity<Publisher> editPublisher(@PathVariable Long id, @Valid @RequestBody Publisher req) {
        try {
            Optional<Publisher> optionalPublisher = publisherService.findById(id);
            Publisher publisher = optionalPublisher.get();
            publisher.setName(req.getName());
            
            return ResponseEntity.ok(publisherService.save(publisher));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/publisher/{id}")
    public ResponseEntity<Publisher> deletePublisher(@PathVariable Long id) {
        try {
            Optional<Publisher> optionalPublisher = publisherService.findById(id);
            Publisher publisher = optionalPublisher.get();
            
            publisherService.delete(publisher);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
