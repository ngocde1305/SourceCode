package com.web.nl.controllers;

import java.util.Collection;
import java.util.List;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.nl.service.CartItemService;
import com.web.nl.service.OrderService;
import com.web.nl.service.ProductService;
import com.web.nl.service.ShoppingCartService;
import com.web.nl.service.UserService;

import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.nl.dto.OrderDTO;
import com.web.nl.dto.ResponseOrderDTO;
import com.web.nl.models.*;
import com.web.nl.repositories.UserRepository;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/shoppingcart")
public class ShoppingCartController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	ShoppingCartService shoppingCartservice;
	@Autowired
	CartItemService cartItemservice;
	@GetMapping("/create/{proId}/{cartId}")
	public ShoppingCart create(@PathVariable long proId,@PathVariable int cartId){
		cartItemservice.newCartItem(proId, cartId);
		return shoppingCartservice.shoppingCartById(cartId);
	}
}
