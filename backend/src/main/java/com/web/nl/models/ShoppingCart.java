package com.web.nl.models;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
@Entity
@Data
public class ShoppingCart {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	@JsonIgnore
	@OneToOne(mappedBy = "shoppingCart")
    private User user;
	
	//@JsonManagedReference
	//@JsonIgnore
	@OneToMany(mappedBy="shoppingCart",cascade=CascadeType.ALL)
    private Collection<CartItem> cartItems;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Collection<CartItem> getCartItems() {
		return cartItems;
	}
	public void setCartItems(Collection<CartItem> cartItems) {
		this.cartItems = cartItems;
	}
	
}
