package com.web.nl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.nl.models.ShoppingCart;
import com.web.nl.models.User;
import com.web.nl.repositories.ShoppingCartRepository;
import com.web.nl.repositories.UserRepository;

@Service
public class ShoppingCartService {
	@Autowired 
	ShoppingCartRepository shoppingCartRepository;
	@Autowired
	UserRepository userRepository;
	public void newShoppingCart(User user) {
		ShoppingCart shoppingCart=new ShoppingCart();
		shoppingCart.setUser(user);
		user.setShoppingCart(shoppingCart);
		userRepository.save(user);
		shoppingCartRepository.save(shoppingCart);
	}
	
	public List<ShoppingCart> list(){
		return shoppingCartRepository.findAll();
	}
	public ShoppingCart shoppingCartById(int id){
		return shoppingCartRepository.findById(id).orElseThrow();
	}
	public ShoppingCart findshoppingCart(Long user_id) {
		User user=userRepository.findById(user_id).orElseThrow();
		return user.getShoppingCart();
	}
}
