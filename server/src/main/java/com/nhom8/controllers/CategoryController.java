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

import com.nhom8.models.Category;
import com.nhom8.services.CategoryService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/api/categories")
    public ResponseEntity<Page<Category>> getCategories(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
        try {
            return ResponseEntity.ok(categoryService.getCategories(page, sortBy));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/allCategories")
    public ResponseEntity<List<Category>> getAllCategories() {
        try {
            return ResponseEntity.ok(categoryService.getAllCategories());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/category")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        try {
            return ResponseEntity.ok(categoryService.createCategory(category));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/category/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(categoryService.getCategory(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/category/{id}")
    public ResponseEntity<Category> editCategory(@PathVariable Long id, @Valid @RequestBody Category editedCategory) {
        try {
            return ResponseEntity.ok(categoryService.editCategory(id, editedCategory));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/category/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(categoryService.deleteCategory(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
}
