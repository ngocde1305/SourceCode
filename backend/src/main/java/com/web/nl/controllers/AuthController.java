package com.web.nl.controllers;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;
import javax.net.ssl.SSLEngineResult.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.web.nl.models.ResponseObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.nl.config.MailBuilder;
import com.web.nl.models.ERole;
import com.web.nl.models.Mail;
import com.web.nl.models.Role;
import com.web.nl.models.User;
import com.web.nl.models.UserDetailsImpl;
import com.web.nl.payload.request.LoginRequest;
import com.web.nl.payload.request.SignupRequest;
import com.web.nl.payload.response.JwtResponse;
import com.web.nl.payload.response.MessageResponse;
import com.web.nl.repositories.RoleRepository;
import com.web.nl.repositories.UserRepository;
import com.web.nl.security.jwt.JwtUtils;
import com.web.nl.service.EmailService;
import com.web.nl.service.ShoppingCartService;
import com.fasterxml.jackson.databind.*;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	private EmailService emailService;
	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	ShoppingCartService shoppingService;
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
	try {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok().header("ok", "of").body(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(),
												 userDetails.getImage(),
												 userDetails.getEmail(), 
												 roles,
												 shoppingService.findshoppingCart(userDetails.getId())
												 ));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), ""));
		}
	}

	@PostMapping(value = "/signup",
			produces = { "application/json" })
	public ResponseEntity<?> registerUser( @RequestParam("username") String username,
			@RequestParam("email") String email,
			@RequestParam("password") String password,
			@RequestParam("imageFile") MultipartFile imageFile){
		
        
		if (userRepository.existsByUsername(username)) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Tên người dùng đã tồn tại!"));
		}

		if (userRepository.existsByEmail(email)) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Email đã tồn tại!!"));
		}

		// Create new user's account
		User user = new User(username, 
							 email,
							 encoder.encode(password));
		Path path = Paths.get("D:\\extra\\-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express-main\\frontend\\src\\assest");
		MultipartFile file = imageFile;
		if(!file.isEmpty()) {
	        try {
	        	InputStream input = file.getInputStream();
	        	Files.copy(input, path.resolve(username+".png"), StandardCopyOption.REPLACE_EXISTING);
	        	user.setImage(username+".png");
	        	
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	       }
		Set<String> strRoles = new HashSet<String>();
		strRoles.add("admin");
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
        
		
		
		
		user.setRoles(roles);
		user.setSta(1);
		
			
		userRepository.save(user);
		shoppingService.newShoppingCart(user);
		return ResponseEntity.ok(new MessageResponse("Đăng ký thành công!"));
	}
	
	@PostMapping("/test")
	public ResponseEntity<?> test(@RequestParam("imageFile") MultipartFile imageFile) {
		Path path = Paths.get("D:\\extra\\-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express-main\\frontend\\src\\assest");
		MultipartFile file = imageFile;
		if(!file.isEmpty()) {
	        try {
	        	InputStream input = file.getInputStream();
	        	Files.copy(input, path.resolve("AAAAAAA"+".jpeg"), StandardCopyOption.REPLACE_EXISTING);
	        	
	        	
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	       }
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
