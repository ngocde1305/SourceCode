package com.web.nl.controllers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.nl.models.Category;
import com.web.nl.models.Product;
import com.web.nl.models.ResponseObject;
import com.web.nl.repositories.CategoryRepository;
import com.web.nl.repositories.ProductRepository;
import com.web.nl.service.CategoryService;
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {
	@Autowired
	ProductRepository proRepo;
	@Autowired
	CategoryRepository cataRepo;
	@Autowired
	CategoryService cataService;
	@GetMapping("/list")
	public List<Category> getAll(){
		List<Category> list=cataRepo.findAll();
		return list;
	}
	@GetMapping("/listName")
	public List<String> getListName(){
		List<String> list = new ArrayList<String>();
		list.addAll(cataService.listName());
		return list;
	}
	@GetMapping("/listProduct/{id}")
	public ResponseEntity<ResponseObject> getListProduct(@PathVariable long id){
		
		Category category = cataRepo.findById(id).orElseThrow();
		if(category!=null) {
			Collection<Product> list=category.getProducts();
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success","Sucessfully",list));
		}
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
				.body(new ResponseObject("Error","Category not exist",""));
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<ResponseObject> detail(@PathVariable long id){
		Category Category = cataRepo.findById(id).orElseThrow();
		if(Category!=null) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success","Sucessfully",Category));
		}
		else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
					.body(new ResponseObject("Error","Category not exist",""));
		}
		
	}
	
	@PostMapping("/create")
	public ResponseEntity<ResponseObject> create(@RequestBody Category Category){
		Category cata = cataRepo.findByName(Category.getName());
		if(cata==null) {
			Category Category1 = new Category();
			Category1.setName(Category.getName());
			cataRepo.save(Category1);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Add successfully", Category1));
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
					.body(new ResponseObject("Error", "Exist", ""));
		
	}
	@PostMapping("/edit/{id}")
	public ResponseEntity<ResponseObject> edit(@RequestBody Category Category,@PathVariable long id){
		Category cata = cataRepo.findById(id).orElseThrow();
		if(cata!=null) {
			cata.setName(Category.getName());
			cataRepo.save(cata);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Add successfully", cata));
		}
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
				.body(new ResponseObject("Error", "No exist", ""));
	}
	@PostMapping("/delete/{id}")
	public ResponseEntity<ResponseObject> delete(@PathVariable long id){
		Category cata = cataRepo.findById(id).orElseThrow();
		if(cata!=null) {
			cataRepo.delete(cata);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Delete successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
				.body(new ResponseObject("Error", "No exist", ""));
	}
}
