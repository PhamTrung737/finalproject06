package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "carts")
@Data
public class CartsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "status")
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserEntity users;

    @ManyToOne
    @JoinColumn(name = "int_payment")
    private PaymentEntity payments;

    @OneToMany(mappedBy = "carts")
    private List<ProductInCartEntity> listProductInCart;

    @ManyToOne
    @JoinColumn(name = "id_money")
    private MoneyEntity moneyEntity;

}
