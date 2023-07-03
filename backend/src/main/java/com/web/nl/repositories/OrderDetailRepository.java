package com.web.nl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.nl.models.Order;
import com.web.nl.models.OrderDetail;
@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {

}
