package com.example.finalprojetc06.repository;

import com.example.finalprojetc06.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity,Integer> {
}
