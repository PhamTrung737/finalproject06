package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.UserAuthenDTO;
import com.example.finalprojetc06.request.LogOutAllDTO;
import com.example.finalprojetc06.request.UpdateUserRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    List<UserAuthenDTO> getListUser();
    String updateUserById(UpdateUserRequest userRequest);
    String deleteUserById(int id);
    String updateAvatarById (int id, MultipartFile file);
    UserAuthenDTO getUserById(int id);
    UserAuthenDTO LogOutAllBowser(LogOutAllDTO logOutAllDTO);
}
