package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.RolesDTO;
import com.example.finalprojetc06.request.AuthenRequest;
import com.example.finalprojetc06.request.LoginRequest;

import java.util.List;

public interface AuthenService {
    String addUser(AuthenRequest authenRequest);

    List<RolesDTO> checkLogin(LoginRequest loginRequest);
}
