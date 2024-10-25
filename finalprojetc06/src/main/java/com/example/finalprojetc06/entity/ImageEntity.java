package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "image")
@Data
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "banner")
    private boolean banner;
    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private ProductEntity products;
}
