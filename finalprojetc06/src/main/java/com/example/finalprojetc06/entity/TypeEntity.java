package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "type")
@Data
public class TypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "types")
    private List<ProductEntity> listProduct;
}
