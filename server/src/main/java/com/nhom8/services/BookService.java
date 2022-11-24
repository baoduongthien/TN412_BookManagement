package com.nhom8.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhom8.models.Book;

@Repository
public interface BookService extends JpaRepository<Book, Long> {

}
