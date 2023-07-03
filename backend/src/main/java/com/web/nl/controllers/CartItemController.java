package com.web.nl.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.nl.models.CartItem;
import com.web.nl.models.ResponseObject;
import com.web.nl.models.ShoppingCart;
import com.web.nl.service.CartItemService;
import com.web.nl.service.ShoppingCartService;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 36000)
@RestController
@RequestMapping("/api/cartItem")
public class CartItemController {
	@Autowired
	ShoppingCartService shoppingCartservice;
	@Autowired
	CartItemService cartItemservice;
	@PostMapping("/create/{proId}/{cartId}")
	public ResponseEntity<ResponseObject> create(@PathVariable long proId,@PathVariable int cartId){
		ShoppingCart shoppingCart =cartItemservice.newCartItem(proId, cartId);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success", "Add successfully",shoppingCart ));
	}
	@PostMapping("/delete/{cartItemId}/{cartId}")
	public ResponseEntity<ResponseObject> delete(@PathVariable int cartItemId,@PathVariable int cartId){
		try {
			ShoppingCart shoppingCart =cartItemservice.deleteCartItem(cartItemId,cartId);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success", "Delete successfully",shoppingCart ));
		}
		catch (Exception e) {
            e.printStackTrace();
        }
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Error", "Delete error","" ));
	}
	@PostMapping("/increase/{cartItemId}/{cartId}")
	public ResponseEntity<ResponseObject> increase(@PathVariable int cartItemId,@PathVariable int cartId){
		try {
			ShoppingCart shoppingCart =cartItemservice.increaseCartItem(cartItemId,cartId);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success", "Increase successfully",shoppingCart ));
		}
		catch (Exception e) {
            e.printStackTrace();
        }
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Error", "Increase error","" ));
	}
	
	@PostMapping("/decrease/{cartItemId}")
	public ResponseEntity<ResponseObject> decrease(@PathVariable int cartItemId,@PathVariable int cartId){
		try {
			ShoppingCart shoppingCart =cartItemservice.decreaseCartItem(cartItemId,cartId);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Success", "Decrease successfully",shoppingCart ));
		}
		catch (Exception e) {
            e.printStackTrace();
        }
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseObject("Error", "Decrease error","" ));
	}
}
