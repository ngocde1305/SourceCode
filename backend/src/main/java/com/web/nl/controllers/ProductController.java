package com.web.nl.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;
import com.web.nl.models.Category;
import com.web.nl.models.PageData;
import com.web.nl.models.Product;
import com.web.nl.models.ResponseObject;
import com.web.nl.payload.request.ProductRequest;
import com.web.nl.repositories.CategoryRepository;
import com.web.nl.repositories.ProductRepository;
import com.web.nl.service.ProductService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties.Value;
import com.fasterxml.jackson.databind.*;
import jakarta.validation.Valid;
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
	@Autowired
	ProductRepository proRepo;
	@Autowired
	CategoryRepository cataRepo;
	@Autowired
	ProductService proService;
	@GetMapping("/list/{page}/{size}")
	public PageData<Product> getAllProducts(@PathVariable("page") int pageNum, @PathVariable("size") int pageSize){
		
		String sortBy = "name";
        // In PageRequest, page count starts at zero
        Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
        Page<Product> pagedResult = proRepo.findAll(paging);
        if (pagedResult.hasContent()) {
        //convert Page to simpler format in PageData
        PageData<Product> pageData = new PageData(pagedResult.getSize(), 
                pagedResult.getTotalPages(), pagedResult.getContent());
           // long totalPages = pagedResult.getTotalPages();
            return pageData; //pagedResult.getContent();
        } else {
            PageData<Product> pageData = new PageData(); 
            return pageData; 
        }
        
	}
	@PostMapping(value="/create",produces = { "application/json" })
	public ResponseEntity<ResponseObject> createProduct(@RequestParam("product") String product,
			@RequestParam("imageFile") MultipartFile imageFile
			){
		ProductRequest product1=new ProductRequest();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			product1= objectMapper.readValue(product, ProductRequest.class);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), ""));
		}
		Product pro = proRepo.findByName(product1.getName()).orElse(null);
		if(pro==null) {
			Product newPro=proService.Product(product1);
			Product pro1 = proRepo.findByName(product1.getName()).orElse(null);
		
		Path path = Paths.get("D:\\extra\\-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express-main\\frontend\\src\\assest");
		MultipartFile file = imageFile;
		if(!file.isEmpty()) {
	        try {
	        	InputStream input = file.getInputStream();
	        	Files.copy(input, path.resolve(pro1.getId()+".png"), StandardCopyOption.REPLACE_EXISTING);
	        	newPro.setImage(pro1.getId()+".png");
	        	proRepo.save(newPro);
	        	
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	       }
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success", "Add successfully"+product, product1));
	
		}
	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseObject("Error", product1.getName()+product, ""));
	}
	
	@PostMapping(value="/edit/{id}",produces = { "application/json" })
	public ResponseEntity<ResponseObject> editProduct(@RequestParam("product") String product,
			@RequestParam("imageFile") Optional<MultipartFile> imageFile,
			@PathVariable long id,
			@RequestParam("oldName") String oldName)throws Exception{
		
		ProductRequest productRe=new ProductRequest();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			productRe= objectMapper.readValue(product, ProductRequest.class);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), e.getMessage()));
		}
		
		if(!(oldName.equals(productRe.getName()))) {
			
			Product proFindName =proRepo.findByName(productRe.getName()).orElse(null);
			System.out.println("okla");
			if(!(proFindName==null)) {
				
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ResponseObject("Error","Tên sản phẩm đã tồn tại", ""));
			}
		}
		Product pro = proRepo.findById(id).orElseThrow();
		Category cata = cataRepo.findByName(productRe.getCategory());
		if (pro == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
					.body(new ResponseObject("Error", "No exist", "no"));
		}
		pro.setName(productRe.getName());
		pro.setContent(productRe.getContent());
		pro.setPrice(productRe.getPrice());
		pro.setUnit(productRe.getUnit());
		try {
		pro.setCategoryOb(cata);
		pro.setCategory(productRe.getCategory());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), e.getMessage()));
		}
		
		Path path = Paths.get("D:\\extra\\-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express-main\\frontend\\src\\assest");
		MultipartFile file = imageFile.orElse(null);
		if(!(file==null)) {
	        try {
	        	InputStream input = file.getInputStream();
	        	Files.copy(input, path.resolve( id+".png"), StandardCopyOption.REPLACE_EXISTING);
	        	pro.setImage( id+".png");
	        	proRepo.save(pro);
	        	
	        } catch (IOException e) {
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ResponseObject("Error",e.getMessage(), e.getMessage()));
	        }
	       }
		
		proRepo.save(pro);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success", "Update Successfully", productRe));
	
	}
	
	@PostMapping("/delete/{id}")
	ResponseEntity<ResponseObject> deleteProduct(@PathVariable long id){
		Product product = proRepo.findById(id).orElseThrow();
		try 
		{
			proRepo.delete(product);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
					.body(new ResponseObject("Error","Product not exist",""));
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success","Delete Sucessfully",product));
	}
	
	@GetMapping("/detail/{id}")
	ResponseEntity<ResponseObject> detailProduct(@PathVariable long id){
		Product product = proRepo.findById(id).orElseThrow();
		if(product!=null)
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success","Sucessfully",product));
		else
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
					.body(new ResponseObject("Error","Product not exist",""));
	}
	@PostMapping(value="/test",
			produces = { "multipart/form-data" })
	public ResponseEntity<ResponseObject> test(@Valid @RequestBody ProductRequest product){
		Category cata = cataRepo.findByName(product.getCategory());
		
		Product pro =new Product();
		pro.setName(product.getName());
		pro.setCategoryOb(cata);
		//cata.setProducts(Collections.singleton(pro));
		//cataRepo.save(cata);
		//proRepo.save(pro);
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
				.body(new ResponseObject("Error","",""));
	}
}
