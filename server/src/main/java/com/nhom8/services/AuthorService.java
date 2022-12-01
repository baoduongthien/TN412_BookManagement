package com.nhom8.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nhom8.models.Author;
import com.nhom8.repository.AuthorRepository;

@Service
public class AuthorService {
    @Autowired
    AuthorRepository authorRepository;

    public Page<Author> getAuthors(Optional<Integer> page, Optional<String> sortBy) {
        Page<Author> pageAuthor = authorRepository.findAll(PageRequest.of(page.orElse(0), 5, Sort.Direction.DESC, sortBy.orElse("id")));
        return pageAuthor;
    }

    public List<Author> getAllAuthors() {
        List<Author> authors = authorRepository.findAll();
        return authors;
    }

    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    public Author getAuthor(Long id) {
        return authorRepository.findById(id).get();
    }

    public Author editAuthor(Long id, Author editedAuthor) {
        Author author = authorRepository.findById(id).get();
        author.setName(editedAuthor.getName());
        authorRepository.save(author);

        return author;
    }

    public Author deleteAuthor(Long id) {
        Author author = authorRepository.findById(id).get();            
        authorRepository.delete(author);

        return author;
    }
}
