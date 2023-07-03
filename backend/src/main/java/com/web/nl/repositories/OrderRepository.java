package com.web.nl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.web.nl.models.Order;
@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
}
