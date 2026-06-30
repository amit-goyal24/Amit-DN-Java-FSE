package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    // Constructor for Constructor Injection
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("BookRepository injected via Constructor.");
    }

    // Default constructor needed if we use setter injection independently
    public BookService() {}

    // Setter for Setter Injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("BookRepository injected via Setter.");
    }

    public void manageBook() {
        System.out.println("Managing book logic executing...");
        bookRepository.saveBook();
    }
}