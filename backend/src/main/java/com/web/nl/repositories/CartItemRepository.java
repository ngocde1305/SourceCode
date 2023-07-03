package com.web.nl.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.web.nl.models.CartItem;
@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Integer> {
	@Query("SELECT u FROM CartItem u WHERE u.productId = ?1 and u.shoppingCart = ?2")
	CartItem findProductIdAndShoppingCartId(Long product_id, Integer shopping_cart_id);
}
