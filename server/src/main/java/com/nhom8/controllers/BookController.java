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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nhom8.models.Book;
import com.nhom8.services.BookService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/api/books")
    public ResponseEntity<Page<Book>> getBooks(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
        try {
            return ResponseEntity.ok(bookService.getBooks(page, sortBy));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/allBooks")
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            return ResponseEntity.ok(bookService.getAllBooks());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/book")
    public ResponseEntity<Book> createBook(
        @RequestParam @Valid String name,
        @RequestParam @Valid String description,
        @RequestParam(required=false) String author_id,
        @RequestParam(required=false) String category_id, 
        @RequestParam(required=false) String publisher_id, 
        @RequestParam(required=false) MultipartFile image
    ) {
        try {            
            return ResponseEntity.ok(bookService.createBook(name, description, author_id, category_id, publisher_id, image));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/book/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookService.getBook(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/book/{id}")
    public ResponseEntity<Book> editBook(
        @PathVariable Long id, 
        @RequestParam @Valid String name, 
        @RequestParam @Valid String description,
        @RequestParam(required=false) String author_id,
        @RequestParam(required=false) String category_id, 
        @RequestParam(required=false) String publisher_id, 
        @RequestParam(required=false) MultipartFile image
    ) {
        try {
            return ResponseEntity.ok(bookService.editBook(id, name, description, author_id, category_id, publisher_id, image));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/book/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookService.deleteBook(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
