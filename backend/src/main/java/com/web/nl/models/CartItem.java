package com.web.nl.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/*@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
*/
@ToString
@Entity
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Long productId;
    private String productName;
    private int quantity;
    private float price;
    public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	private float total;
    private String category;
    private String image;
    
    public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
	
	//@JsonBackReference
	@JsonIgnore
	@ManyToOne 
	@JoinColumn(name="shoppingCart_id")//, insertable = false, updatable = false) // thông qua khóa ngoại address_id
    private ShoppingCart shoppingCart;
    public CartItem() {
    }

    public CartItem(Long productId, String productName, int quantity, float total) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.total = total;
    }

    public CartItem(Long productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", productId=" + productId +
                ", productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", total=" + total +
                '}';
    }
}

