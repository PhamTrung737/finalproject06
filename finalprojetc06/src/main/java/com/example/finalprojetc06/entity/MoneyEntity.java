package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "money")
@Data
public class MoneyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "value")
    private String value;

    @OneToMany(mappedBy = "moneyEntity")
    private List<CartsEntity> cartsEntities;

}
