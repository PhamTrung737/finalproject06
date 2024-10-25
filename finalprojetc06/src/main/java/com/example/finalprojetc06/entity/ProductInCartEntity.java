package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;


@Entity(name = "productincart")
@Data
public class ProductInCartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "quantity")
    private int quantity;
    @Column(name = "create_day")
    private Timestamp createDay;

    @ManyToOne
    @JoinColumn(name = "id_cart")
    private CartsEntity carts;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private ProductEntity products;
}
