package com.web.nl.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.nl.models.*;
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
	Optional<Category> findById(Long id);
	Category findByName(String name);
}
