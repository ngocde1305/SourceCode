package com.web.nl.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.nl.models.PageData;
import com.web.nl.models.Product;
import com.web.nl.models.User;
import com.web.nl.repositories.UserRepository;
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserRepository userRepo;
	@GetMapping("/list/{page}/{size}")
	public PageData<User> getAllUsers(@PathVariable("page") int pageNum, @PathVariable("size") int pageSize){		
		String sortBy = "username";
        // In PageRequest, page count starts at zero
        Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
        Page<User> pagedResult = userRepo.findAll(paging);
        if (pagedResult.hasContent()) {
        //convert Page to simpler format in PageData
        PageData<User> pageData = new PageData(pagedResult.getSize(), 
                pagedResult.getTotalPages(), pagedResult.getContent());
           // long totalPages = pagedResult.getTotalPages();
            return pageData; //pagedResult.getContent();
        } else {
            PageData<User> pageData = new PageData(); 
            return pageData; 
        }
        
	}
	@GetMapping("/listSta/{id}")
	public User getAll(@PathVariable("id") long id){
		return userRepo.findById(id).orElseThrow();
	}
}
