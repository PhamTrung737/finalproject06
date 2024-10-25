package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;


@Entity(name = "comment")
@Data
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "description")
    private String description;
    @Column(name = "evaluate")
    private int evaluate;


    @Column(name = "create_day")
    private Timestamp createDay;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserEntity users;

   @ManyToOne
    @JoinColumn(name = "id_product")
    private ProductEntity products;
}
