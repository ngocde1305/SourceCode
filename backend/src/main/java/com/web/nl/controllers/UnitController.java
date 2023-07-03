package com.web.nl.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.nl.models.Category;
import com.web.nl.models.Unit;
import com.web.nl.repositories.ProductRepository;
import com.web.nl.repositories.UnitRepository;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/unit")
public class UnitController {
	@Autowired
	UnitRepository unitRepo;
	@GetMapping("/list")
	public List<Unit> getAll(){
		List<Unit> list=unitRepo.findAll();
		return list;
	}
}
