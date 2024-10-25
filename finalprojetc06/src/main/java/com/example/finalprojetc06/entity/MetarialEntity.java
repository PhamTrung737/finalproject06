package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "metarial")
@Data
public class MetarialEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "metarials")
    private List<ProductEntity> listProducts;
}
