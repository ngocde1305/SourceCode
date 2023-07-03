package com.web.nl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.nl.models.ShoppingCart;
import com.web.nl.models.User;
import com.web.nl.repositories.OrderDetailRepository;
import com.web.nl.repositories.OrderRepository;
import com.web.nl.repositories.ProductRepository;
import com.web.nl.repositories.ShoppingCartRepository;
import com.web.nl.models.Order;
import com.web.nl.models.OrderDetail;
import com.web.nl.models.Product;

@Service
public class OrderDetailService {
	@Autowired 
	OrderRepository orderRepo;
	@Autowired 
	ProductRepository proRepo;
	@Autowired 
	OrderDetailRepository orderDeRepo;
	public void newOrderDetail(Order order,long product_id,int quantity,float price,float total) {
		OrderDetail orderDetail=new OrderDetail();
		Product pro=proRepo.findById(product_id).orElseThrow();
		orderDetail.setQuantity(quantity);
		orderDetail.setPrice(price);
		orderDetail.setDiscount(total);
		orderDetail.setOrder(order);
		orderRepo.save(order);
		orderDetail.setProduct(pro);
		pro.setCount(pro.getCount()+1);
		proRepo.save(pro);
		
		orderDeRepo.save(orderDetail);
		
		
	}
}
