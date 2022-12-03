package com.nhom8.services;

import java.io.File;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nhom8.models.Author;
import com.nhom8.models.Book;
import com.nhom8.models.Category;
import com.nhom8.models.Publisher;
import com.nhom8.repository.AuthorRepository;
import com.nhom8.repository.BookRepository;
import com.nhom8.repository.CategoryRepository;
import com.nhom8.repository.PublisherRepository;

@Service
public class BookService {

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    public Page<Book> getBooks(Optional<Integer> page, Optional<String> sortBy) {
        Page<Book> pageBook = bookRepository.findAll(PageRequest.of(page.orElse(0), 5, Sort.Direction.DESC, sortBy.orElse("id")));
        return pageBook;
    }

    public List<Book> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books;
    }

    private void deleteOldImage(String thumbnail) {
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");

        File oldThumbnail = new File(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(thumbnail).toString());
        oldThumbnail.delete();
    }

    private String imageDirectory(MultipartFile image) {
        try {
            Path staticPath = Paths.get("static");
            Path imagePath = Paths.get("images");
            if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
            }
    
            String thumbnail = (new Timestamp(System.currentTimeMillis())).getTime() + image.getOriginalFilename();
    
            Path file = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(thumbnail);
            
            OutputStream os = Files.newOutputStream(file);
            os.write(image.getBytes());
            
            return thumbnail;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public Book createBook(String name, String description, Long price, String author_id, String category_id, String publisher_id, MultipartFile image) {
        
        String thumbnail = "";
        if (image != null && !image.isEmpty()) {
            thumbnail = imageDirectory(image);
        }

        // create new book
        Book book = new Book();

        book.setName(name);
        book.setDescription(description);
        book.setPrice(price);
        
        if (author_id != null) {
            Author author = authorRepository.findById(Long.parseLong(author_id)).get();
            book.setAuthor(author);
        }

        if (category_id != null) {
            Category category = categoryRepository.findById(Long.parseLong(category_id)).get();
            book.setCategory(category);
        }

        if (publisher_id != null) {
            Publisher publisher = publisherRepository.findById(Long.parseLong(publisher_id)).get();
            book.setPublisher(publisher);
        }

        book.setThumbnail(thumbnail);
        
        return bookRepository.save(book);
    }

    public Book getBook(Long id) {
        return bookRepository.findById(id).get();
    }

    public Book editBook(Long id, String name, String description, Long price, String author_id, String category_id, String publisher_id, MultipartFile image) {

        Book book = bookRepository.findById(id).get();
        String thumbnail = book.getThumbnail();

        if (image != null && !image.isEmpty()) {
            deleteOldImage(thumbnail);
            thumbnail = imageDirectory(image);
        }
        
        book.setName(name);
        book.setDescription(description);
        book.setPrice(price);

        if (author_id != null) {
            Author author = authorRepository.findById(Long.parseLong(author_id)).get();
            book.setAuthor(author);
        }

        if (category_id != null) {
            Category category = categoryRepository.findById(Long.parseLong(category_id)).get();
            book.setCategory(category);
        }

        if (publisher_id != null) {
            Publisher publisher = publisherRepository.findById(Long.parseLong(publisher_id)).get();
            book.setPublisher(publisher);
        }

        book.setThumbnail(thumbnail);
        
        return bookRepository.save(book);
    }

    public Book deleteBook(Long id) {
        Book book = bookRepository.findById(id).get();

        deleteOldImage(book.getThumbnail());
        bookRepository.delete(book);

        return book;
    }

    public Page<Book> searchBooks(String name, Optional<Integer> page, Optional<String> sortBy) {
        Pageable pageable = PageRequest.of(page.orElse(0), 6, Sort.Direction.DESC, sortBy.orElse("id"));
        return bookRepository.findByName(name, pageable);
    }
}
