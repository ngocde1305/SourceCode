package com.web.nl.payload.response;

import java.util.List;

import com.web.nl.models.ShoppingCart;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String username;
  private String image;
  private String email;
  private List<String> roles;
  private ShoppingCart shoppingCart;
  public ShoppingCart getShoppingCart() {
	return shoppingCart;
}

public void setShoppingCart(ShoppingCart shoppingCart) {
	this.shoppingCart = shoppingCart;
}

public JwtResponse(String accessToken, Long id, String username,String image, String email, List<String> roles,ShoppingCart shoppingCart) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.image=image;
    this.email = email;
    this.roles = roles;
    this.shoppingCart=shoppingCart;
  }

  public String getToken() {
	return token;
}

public void setToken(String token) {
	this.token = token;
}

public String getType() {
	return type;
}

public void setType(String type) {
	this.type = type;
}

public String getImage() {
	return image;
}

public void setImage(String image) {
	this.image = image;
}

public void setRoles(List<String> roles) {
	this.roles = roles;
}

public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public List<String> getRoles() {
    return roles;
  }
}

