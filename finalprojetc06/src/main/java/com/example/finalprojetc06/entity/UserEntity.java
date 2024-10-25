package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "users")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "avatar")
    private String avatar;
    @ManyToOne
    @JoinColumn(name = "id_roles")
    private RolesEntity roles;

    @OneToMany(mappedBy = "users")
    private List<CommentEntity> listComment;

    @OneToMany(mappedBy = "users")
    private List<CartsEntity> listCart;


}
