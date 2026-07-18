package com.cognizant.ormlearn.repository;
import java.util.List;
import com.cognizant.ormlearn.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, String> {
    // Hands-on 1: Search by containing text and sort ascending
    List<Country> findByNameContainingOrderByNameAsc(String name);

    // Hands-on 1: Filter with starting text
    List<Country> findByNameStartingWith(String letter);
}