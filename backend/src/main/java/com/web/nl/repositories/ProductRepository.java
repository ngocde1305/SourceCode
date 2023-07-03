package com.web.nl.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.web.nl.models.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
	Optional<Product> findById(Long id);
	Optional<Product> findByName(String name);
}
