package com.nhom8.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhom8.models.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value="SELECT * FROM books WHERE name LIKE CONCAT('%',:name,'%')", nativeQuery = true)
	Page<Book> findByName(@Param("name") String name, Pageable pageable);
}
