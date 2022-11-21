package com.nhom8.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhom8.models.Author;

@Repository
public interface AuthorService extends JpaRepository<Author, Long> {
    
}
