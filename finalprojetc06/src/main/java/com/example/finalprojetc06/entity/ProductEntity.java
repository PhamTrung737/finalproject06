package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "product")
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "price")
    private double price;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;

    @Column(name = "size")
    private String size;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private CategoryEntity categorys;

    @ManyToOne
    @JoinColumn(name = "id_conection")
    private ConnectionEntity connections;

    @ManyToOne
    @JoinColumn(name = "id_type")
    private TypeEntity types;

    @ManyToOne
    @JoinColumn(name = "id_metarial")
    private MetarialEntity metarials;

    @OneToMany(mappedBy = "products")
    private List<ImageEntity> listImage;

    @OneToMany(mappedBy = "products")
    private  List<CommentEntity> listComment;

    @OneToMany(mappedBy = "products")
    private List<ProductInCartEntity> listProductInCart;
}
