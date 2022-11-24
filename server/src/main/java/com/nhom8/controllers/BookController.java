package com.nhom8.controllers;

import java.util.Optional;
import java.io.File;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nhom8.models.Author;
import com.nhom8.models.Book;
import com.nhom8.models.Category;
import com.nhom8.models.Publisher;
import com.nhom8.services.AuthorService;
import com.nhom8.services.BookService;
import com.nhom8.services.CategoryService;
import com.nhom8.services.PublisherService;

@RestController
public class BookController {

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Autowired
    private BookService bookService;
    @Autowired
    private AuthorService authorService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private PublisherService publisherService;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/books")
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            return ResponseEntity.ok(bookService.findAll());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/api/book")
    public ResponseEntity<Book> createBook(@RequestParam @Valid String name, @RequestParam String author_id,
            @RequestParam String category_id, @RequestParam String publisher_id, @RequestParam MultipartFile image) {
        try {
            Path staticPath = Paths.get("static");
            Path imagePath = Paths.get("images");
            if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
            }

            String thumbnail = (new Timestamp(System.currentTimeMillis())).getTime() + image.getOriginalFilename();

            Path file = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(thumbnail);
            try (OutputStream os = Files.newOutputStream(file)) {
                os.write(image.getBytes());
            }

            // create new book

            Book book = new Book();

            book.setName(name);

            Optional<Author> author = authorService.findById(Long.parseLong(author_id));
            book.setAuthor(author.get());

            Optional<Category> category = categoryService.findById(Long.parseLong(category_id));
            book.setCategory(category.get());

            Optional<Publisher> publisher = publisherService.findById(Long.parseLong(publisher_id));
            book.setPublisher(publisher.get());

            book.setThumbnail(thumbnail);
            
            bookService.save(book);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/api/book/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        try {
            Optional<Book> optionalBook = bookService.findById(id);
            Book book = optionalBook.get();

            return ResponseEntity.ok(book);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/api/book/{id}")
    public ResponseEntity<Book> editBook(@PathVariable Long id, @RequestParam String name, @RequestParam String author_id,
            @RequestParam String category_id, @RequestParam String publisher_id, @RequestParam(value="image", required=false) MultipartFile image) {
        try {

            Book book = bookService.findById(id).get();
            String thumbnail = book.getThumbnail();

            if (image != null && !image.isEmpty()) {

                Path staticPath = Paths.get("static");
                Path imagePath = Paths.get("images");

                File oldThumbnail = new File(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(book.getThumbnail()).toString());
                oldThumbnail.delete();

                if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                    Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                }
    
                thumbnail = (new Timestamp(System.currentTimeMillis())).getTime() + image.getOriginalFilename();
    
                Path file = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(thumbnail);
                try (OutputStream os = Files.newOutputStream(file)) {
                    os.write(image.getBytes());
                }
            }
            
            book.setName(name);

            Optional<Author> author = authorService.findById(Long.parseLong(author_id));
            book.setAuthor(author.get());

            Optional<Category> category = categoryService.findById(Long.parseLong(category_id));
            book.setCategory(category.get());

            Optional<Publisher> publisher = publisherService.findById(Long.parseLong(publisher_id));
            book.setPublisher(publisher.get());

            book.setThumbnail(thumbnail);
            
            bookService.save(book);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/api/book/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id) {
        try {

            Book book = bookService.findById(id).get();

            Path staticPath = Paths.get("static");
            Path imagePath = Paths.get("images");

            File oldThumbnail = new File(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(book.getThumbnail()).toString());
            oldThumbnail.delete();

            bookService.delete(book);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}
