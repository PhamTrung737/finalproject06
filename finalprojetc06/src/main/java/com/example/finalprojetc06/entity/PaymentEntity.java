package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "payment")
@Data
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany(mappedBy = "payments")
    private List<CartsEntity> listCart;
}
