package com.example.finalprojetc06.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserAuthenDTO {
    int id ;
    String nameUser;
    String token;
    String avatar;
    List<RolesDTO> listRoles;
    String email;
    RolesDTO roles;
    int version;
}
