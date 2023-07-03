package com.web.nl.models;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import com.web.nl.models.CartItem;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
@ToString
@Entity
@Data
@Table(name="orders") 
public class Order {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	    @JsonIgnore
	  	@ManyToOne 		
	  	@JoinColumn(name="user_id")//, insertable = false, updatable = false) // thông qua khóa ngoại address_id
	    private User user;
	    @OneToMany(mappedBy="order",cascade=CascadeType.ALL) 
	    private Collection<OrderDetail> orderDetails;
	    
	    private String name;
	    private String phone;
	    private String email;
	    private String orderDescription;
        private String city;
        private String district;
        private String ward;
        private String address;
        private Date date;
        public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getPhone() {
			return phone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public String getDistrict() {
			return district;
		}
		public void setDistrict(String district) {
			this.district = district;
		}
		public String getWard() {
			return ward;
		}
		public void setWard(String ward) {
			this.ward = ward;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public Date getDate() {
			return date;
		}
		public void setDate(Date date) {
			this.date = date;
		}
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
		public String getOrderDescription() {
			return orderDescription;
		}
		public void setOrderDescription(String orderDescription) {
			this.orderDescription = orderDescription;
		}
		public Collection<OrderDetail> getOrderDetails() {
			return orderDetails;
		}
		public void setOrderDetails(Collection<OrderDetail> orderDetails) {
			this.orderDetails = orderDetails;
		}
        
        
}
