package com.web.nl.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.nl.models.Category;
import com.web.nl.models.Unit;

@Repository
public interface UnitRepository extends JpaRepository<Unit,Long> {
	
}
