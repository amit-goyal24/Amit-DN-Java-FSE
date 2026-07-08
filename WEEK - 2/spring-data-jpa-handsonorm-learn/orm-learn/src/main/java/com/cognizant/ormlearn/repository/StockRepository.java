package com.cognizant.ormlearn.repository;

import com.cognizant.ormlearn.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {
    List<Stock> findByCodeAndDateBetween(String code, Date startDate, Date endDate);
    List<Stock> findByCodeAndCloseGreaterThan(String code, double closePrice);
    List<Stock> findTop3ByCodeOrderByVolumeDesc(String code);
    List<Stock> findTop3ByCodeOrderByCloseAsc(String code);
}