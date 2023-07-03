package com.web.nl.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.nl.models.Order;
import com.web.nl.models.Product;
import com.web.nl.models.ShoppingCart;
import com.web.nl.models.User;
import com.web.nl.payload.request.OrderDTO;
import com.web.nl.models.CartItem;
import com.web.nl.repositories.OrderDetailRepository;
import com.web.nl.repositories.OrderRepository;
import com.web.nl.repositories.ProductRepository;
import com.web.nl.repositories.UserRepository;

@Service
public class OrderService {
   @Autowired
   ProductRepository productRepository;
   @Autowired
   OrderRepository orderRepository;
   @Autowired
   OrderDetailService orderDeService;
   @Autowired
   UserRepository userRepo;
    //private OrderRepository orderRepository;
    //private ProductRepository productRepository;

    /*public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }*/

    public Order getOrderDetail(int orderId) {
        Optional<Order> order = this.orderRepository.findById(orderId);
        return order.isPresent() ? order.get() : null;
    }

    public float getCartAmount(List<CartItem> CartItemList) {

        float totalCartAmount = 0f;
        float singleCartAmount = 0f;
        int availableQuantity = 0;

        for (CartItem cart : CartItemList) {

            Long productId = cart.getProductId();
            Optional<Product> product = productRepository.findById(productId);
            if (product.isPresent()) {
                Product product1 = product.get();
                if (product1.getAvailableQuantity() < cart.getQuantity()) {
                    singleCartAmount = product1.getPrice() * product1.getAvailableQuantity();
                    cart.setQuantity(product1.getAvailableQuantity());
                } else {
                    singleCartAmount = cart.getQuantity() * product1.getPrice();
                    availableQuantity = product1.getAvailableQuantity() - cart.getQuantity();
                }
                totalCartAmount = totalCartAmount + singleCartAmount;
                product1.setAvailableQuantity(availableQuantity);
                availableQuantity=0;
                cart.setProductName(product1.getName());
                cart.setTotal(totalCartAmount);
                productRepository.save(product1);
            }
        }
        return totalCartAmount;
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
    public Order newOrder(long user_id,OrderDTO or) {
    	User user= userRepo.findById(user_id).orElseThrow();
    	Order order = new Order();
    	order.setName(or.getName());
    	 
    	order.setEmail(or.getEmail());
    	order.setPhone(or.getPhone());
    	order.setCity(or.getProvince());
    	order.setDistrict(or.getDistrict());
    	order.setWard(or.getWard());
    	order.setAddress(or.getAddress());
    	order.setDate(new Date());
    	order.setUser(user);
    	ShoppingCart cart=user.getShoppingCart();
    	System.out.println(cart.getCartItems());
    	cart.getCartItems().forEach(e->{
    		orderDeService.newOrderDetail(order,e.getProductId(), e.getQuantity(), e.getPrice(), e.getTotal());
    	});
    	orderRepository.save(order);
    	userRepo.save(user);
    	return order;
    }
}

