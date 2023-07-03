package com.web.nl;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.web.nl.models.Category;
import com.web.nl.models.Product;
import com.web.nl.repositories.CategoryRepository;
import com.web.nl.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class NienluancsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NienluancsApplication.class, args);
	}
	/*
	//test
	 @Autowired
	 ProductRepository productRepository;
	 @Autowired
	 CategoryRepository CategoryRepository;
	 @Override
	public void run(String... args) throws Exception {
        // Tạo ra đối tượng Address có tham chiếu tới person
        Category cata = new Category();
        cata.setName("Thit");

        // Tạo ra đối tượng person
        Product pro = new Product();
        pro.setName("Thit heo");
        pro.setCategory(cata);

        cata.setProducts(Collections.singleton(pro));
        // Lưu vào db
        // Chúng ta chỉ cần lưu address, vì cascade = CascadeType.ALL nên nó sẽ lưu luôn Person.
        CategoryRepository.saveAndFlush(cata);


        // Vào: http://localhost:8080/h2-console/ để xem dữ liệu đã insert

        productRepository.findAll().forEach(p -> {
            System.out.println(p.getId());
            System.out.println(p.getName());
            System.out.println(p.getCategory());
        });
	 }
	 */

}

