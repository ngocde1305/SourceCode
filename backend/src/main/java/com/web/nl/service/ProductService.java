package com.web.nl.service;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.nl.models.Category;
import com.web.nl.payload.request.ProductRequest;
import com.web.nl.repositories.CategoryRepository;
import com.web.nl.repositories.ProductRepository;
import com.web.nl.models.*;
@Service
public class ProductService {
	private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return this.productRepository.findAll();
    }
	@Autowired
	CategoryRepository cataRepo;
	@Autowired
	ProductRepository proRepo;
	public Product Product(ProductRequest product) {
		Product pro=new Product();
		Category cata=cataRepo.findByName(product.getCategory());
		pro.setName(product.getName());
		pro.setContent(product.getContent());
		pro.setPrice(product.getPrice());
		pro.setCategoryOb(cata);
		pro.setCategory(product.getCategory());
		pro.setUnit(product.getUnit());
		pro.setCreated_at(new Date());
		//cata.setProducts(Collections.singleton(pro));
		proRepo.save(pro);
		return pro;
	}
}
