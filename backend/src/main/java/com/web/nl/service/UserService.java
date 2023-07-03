package com.web.nl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.nl.models.User;
import com.web.nl.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepo;
	@Autowired
	ShoppingCartService shoService;
    /*private UserRepository userRepository;

    public UserService(UserRepository customerRepository) {
        this.userRepository = customerRepository;
    }*/

    public User saveUser(User User){
    	shoService.newShoppingCart(User);
        return userRepo.save(User);
    }

    //public Long isUserPresent(User user){
    //    User user1 = userRepo.getUserByEmailAndUsername(user.getEmail(),user.getUsername());
    //    return user1!=null ? user1.getId(): null ;
   // }
}

