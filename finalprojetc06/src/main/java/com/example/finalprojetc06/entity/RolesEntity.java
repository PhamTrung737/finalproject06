package com.example.finalprojetc06.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "roles")
@Data
public class RolesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "roles")
    private List<UserEntity> listUsers;

}
