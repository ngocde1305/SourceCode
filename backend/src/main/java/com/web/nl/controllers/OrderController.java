package com.web.nl.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.nl.models.Order;
import com.web.nl.models.PageData;
import com.web.nl.models.Product;
import com.web.nl.models.ResponseObject;
import com.web.nl.payload.request.ProductRequest;
import com.web.nl.repositories.OrderRepository;
import com.web.nl.service.OrderService;
import com.web.nl.payload.request.OrderDTO;
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {
	@Autowired
	OrderService orSer;
	@Autowired
	OrderRepository orRepo;
	@GetMapping("/list/{page}/{size}")
	public PageData<Order> getAllProducts(@PathVariable("page") int pageNum, @PathVariable("size") int pageSize){
		
		String sortBy = "name";
        // In PageRequest, page count starts at zero
        Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
        Page<Order> pagedResult = orRepo.findAll(paging);
        if (pagedResult.hasContent()) {
        //convert Page to simpler format in PageData
        PageData<Order> pageData = new PageData(pagedResult.getSize(), 
                pagedResult.getTotalPages(), pagedResult.getContent());
           // long totalPages = pagedResult.getTotalPages();
            return pageData; //pagedResult.getContent();
        } else {
            PageData<Order> pageData = new PageData(); 
            return pageData; 
        }
        
	}
	@PostMapping(value="/create",produces = { "application/json" })
	public ResponseEntity<ResponseObject> create(@RequestParam("order") String order,
			@RequestParam("userId") long user_id
			){
		OrderDTO orderDTO=new OrderDTO();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			orderDTO= objectMapper.readValue(order, OrderDTO.class);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("mapping"+e.getMessage(),e.getMessage(), ""));
		}
		try {
			Order order1=orSer.newOrder(user_id, orderDTO);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success", "Add successfully", order1));
	
		}catch(Exception e) {
	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseObject(e.getMessage(), "", ""));
	}
	}
}
