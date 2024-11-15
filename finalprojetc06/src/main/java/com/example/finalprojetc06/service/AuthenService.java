package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.RolesDTO;
import com.example.finalprojetc06.dto.UserAuthenDTO;
import com.example.finalprojetc06.request.AuthenRequest;
import com.example.finalprojetc06.request.ChangePasswordRequest;
import com.example.finalprojetc06.request.LoginRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuthenService {
    String addUser(AuthenRequest authenRequest);
    UserAuthenDTO getUserByLogin (LoginRequest loginRequest);
    List<RolesDTO> checkLogin(LoginRequest loginRequest);
    String changePassByUser(ChangePasswordRequest changePasswordRequest);
}
