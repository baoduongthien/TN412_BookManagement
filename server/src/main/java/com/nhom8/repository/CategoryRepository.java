package com.nhom8.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhom8.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
