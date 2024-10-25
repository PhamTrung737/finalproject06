package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.RolesDTO;
import com.example.finalprojetc06.entity.RolesEntity;
import com.example.finalprojetc06.entity.UserEntity;

import com.example.finalprojetc06.repository.AuthenRepository;
import com.example.finalprojetc06.repository.RoleRepository;
import com.example.finalprojetc06.request.AuthenRequest;
import com.example.finalprojetc06.request.LoginRequest;
import com.example.finalprojetc06.service.AuthenService;
import com.example.finalprojetc06.utils.JwtsToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;



@Service
public class AuthenServiceImp implements AuthenService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenRepository authenRepository;

    @Autowired
    private JwtsToken jwtsToken;

    @Override
    @Transactional
    public String  addUser(AuthenRequest authenRequest) {
        List<UserEntity> listUsers = authenRepository.findAll();
        boolean found = true;
        for (UserEntity user:listUsers
             ) {
            if(user.getEmail().equalsIgnoreCase(authenRequest.getEmail())){
                found = false;
                break;
            }
        }

        if(found){
            UserEntity users = new UserEntity();
            users.setEmail(authenRequest.getEmail());
            users.setFullName(authenRequest.getFullName());
            users.setPassword(passwordEncoder.encode(authenRequest.getPassword()));
            RolesEntity roles = new RolesEntity();
            roles.setId(2);
            users.setRoles(roles);
            authenRepository.save(users);

            return "Add user success";
        }else {
            return "User has existed";
        }
    }

    @Override
    public List<RolesDTO> checkLogin(LoginRequest loginRequest) {

        List<RolesDTO> listRoles = new ArrayList<RolesDTO>();
        UserEntity user  = authenRepository.findUserEntitiesByEmail(loginRequest.getEmail());

        if(user!=null && passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
            RolesDTO rolesDTO = new RolesDTO(user.getRoles().getName());
            listRoles.add(rolesDTO);
        }

       return listRoles;
    }
}
