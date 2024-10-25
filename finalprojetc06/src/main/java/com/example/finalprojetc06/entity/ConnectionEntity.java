package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "conection")
@Data
public class ConnectionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "image")
    private String image;
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "connections")
    private List<ProductEntity> listProduct;
}
