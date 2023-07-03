package com.web.nl.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "order_details")
public class OrderDetail {
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getDiscount() {
		return discount;
	}
	public void setDiscount(float discount) {
		this.discount = discount;
	}
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@JsonIgnore
	@ManyToOne 
	@JoinColumn(name="order_id")//, insertable = false, updatable = false) // thông qua khóa ngoại address_id
    private Order order;
	@JsonIgnore
	@ManyToOne 
	@JoinColumn(name="product_id")//, insertable = false, updatable = false) // thông qua khóa ngoại address_id
    private Product product;
	private float price;
	private int quantity;
	private float discount;
}
