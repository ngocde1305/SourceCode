package com.web.nl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.nl.models.Product;
import com.web.nl.models.ShoppingCart;
import com.web.nl.models.CartItem;
import com.web.nl.repositories.CartItemRepository;
import com.web.nl.repositories.ProductRepository;
import com.web.nl.repositories.ShoppingCartRepository;

@Service
public class CartItemService {
	@Autowired 
	CartItemRepository cartItemRepository;
	@Autowired 
	ProductRepository productRepository;
	@Autowired 
	ShoppingCartRepository shoppingCartRepository;
	public ShoppingCart newCartItem(Long product_id,int shoppingCart_id) {
		Product product = productRepository.findById(product_id).orElseThrow();
		CartItem cartItem= new CartItem();
		cartItem.setProductId(product.getId());
		cartItem.setProductName(product.getName());
		cartItem.setCategory(product.getCategory());
		cartItem.setQuantity(1);
		cartItem.setImage(product.getImage());
		cartItem.setPrice(product.getPrice());
		cartItem.setTotal(product.getPrice());
		ShoppingCart shoppingcart=shoppingCartRepository.findById(shoppingCart_id).orElseThrow();
		cartItem.setShoppingCart(shoppingcart);
		cartItemRepository.save(cartItem);
		shoppingCartRepository.save(shoppingcart);
		List<CartItem> list=cartItemRepository.findAll();
	    CartItem cart=new CartItem();
		return shoppingCartRepository.findById(shoppingCart_id).orElseThrow();
	}
	public ShoppingCart deleteCartItem(int CartItem_id,int shoppingCart_id) {
		 cartItemRepository.deleteById(CartItem_id);
		 return shoppingCartRepository.findById(shoppingCart_id).orElseThrow();
	}
	public ShoppingCart increaseCartItem(int CartItem_id, int shoppingCart_id) {
		 CartItem cartItem =cartItemRepository.findById(CartItem_id).orElseThrow();
		 cartItem.setQuantity(cartItem.getQuantity()+1);
		 cartItemRepository.save(cartItem);
		 
		 return shoppingCartRepository.findById(shoppingCart_id).orElseThrow();
	}
	public ShoppingCart decreaseCartItem(int CartItem_id,int shoppingCart_id) {
		 CartItem cartItem =cartItemRepository.findById(CartItem_id).orElseThrow();
		 if(cartItem.getQuantity()>1)
			 cartItem.setQuantity(cartItem.getQuantity()-1);
		 cartItemRepository.save(cartItem);
		 return shoppingCartRepository.findById(shoppingCart_id).orElseThrow();
	}
	
}
