package com.nhom8.controllers;

import java.util.Optional;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhom8.models.Category;
import com.nhom8.services.CategoryService;

@RestController
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        try {
            return ResponseEntity.ok(categoryService.findAll());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/category")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category req) {
        try {
            categoryService.save(req);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/category/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable Long id) {
        try {
            Optional<Category> optionalCategory = categoryService.findById(id);
            Category category = optionalCategory.get();

            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/category/{id}")
    public ResponseEntity<Category> editCategory(@PathVariable Long id, @Valid @RequestBody Category req) {
        try {
            Optional<Category> optionalCategory = categoryService.findById(id);
            Category category = optionalCategory.get();
            category.setName(req.getName());
            
            return ResponseEntity.ok(categoryService.save(category));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/category/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
        try {
            Optional<Category> optionalCategory = categoryService.findById(id);
            Category category = optionalCategory.get();
            
            categoryService.delete(category);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
