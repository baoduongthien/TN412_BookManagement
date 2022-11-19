package com.nhom8.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom8.models.Author;
import com.nhom8.repository.AuthorRepository;

@RestController
@RequestMapping(path="/api/authors")
public class AuthorController {
    
    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping()
    public Iterable<Author> getAllAuthors() {
        return authorRepository.findAll();
    }
    
}
