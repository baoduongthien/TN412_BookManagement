package com.nhom8.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nhom8.models.Category;
import com.nhom8.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Page<Category> getAllCategories(Optional<Integer> page, Optional<String> sortBy) {
        Page<Category> pageCategory = categoryRepository.findAll(PageRequest.of(page.orElse(0), 5, Sort.Direction.DESC, sortBy.orElse("id")));
        return pageCategory;
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category getCategory(Long id) {
        return categoryRepository.findById(id).get();
    }

    public Category editCategory(Long id, Category editedCategory) {
        Category category = categoryRepository.findById(id).get();
        category.setName(editedCategory.getName());
        categoryRepository.save(category);

        return category;
    }

    public Category deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).get();            
        categoryRepository.delete(category);

        return category;
    }
}
