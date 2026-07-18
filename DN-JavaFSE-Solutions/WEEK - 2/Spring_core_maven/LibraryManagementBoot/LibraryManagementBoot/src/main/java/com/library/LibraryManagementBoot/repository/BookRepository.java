package com.library.LibraryManagementBoot.repository;

import com.library.LibraryManagementBoot.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}