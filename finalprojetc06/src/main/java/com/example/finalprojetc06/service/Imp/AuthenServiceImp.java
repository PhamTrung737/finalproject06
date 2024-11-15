package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.RolesDTO;
import com.example.finalprojetc06.dto.UserAuthenDTO;
import com.example.finalprojetc06.entity.RolesEntity;
import com.example.finalprojetc06.entity.UserEntity;

import com.example.finalprojetc06.exeption.UserException;
import com.example.finalprojetc06.repository.RoleRepository;
import com.example.finalprojetc06.repository.UsersRepository;
import com.example.finalprojetc06.request.AuthenRequest;
import com.example.finalprojetc06.request.ChangePasswordRequest;
import com.example.finalprojetc06.request.LoginRequest;

import com.example.finalprojetc06.service.AuthenService;
import com.example.finalprojetc06.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class AuthenServiceImp implements AuthenService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsersRepository usersRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Autowired
    private RoleRepository roleRepository ;

    @Autowired
    private FileService fileService;


    @Override
    @Transactional
    public String  addUser(AuthenRequest authenRequest) {

        List<UserEntity> listUsers = usersRepository.findAll();
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
            users.setAvatar("user.jpg");
            usersRepository.save(users);

            return "Add user success";
        }else {
            throw new UserException("Email registered account");
        }
    }




    @Override
    public List<RolesDTO> checkLogin(LoginRequest loginRequest) {

        List<RolesDTO> listRoles = new ArrayList<RolesDTO>();
        UserEntity user  = usersRepository.findUserEntitiesByEmail(loginRequest.getEmail());

        if(user!=null && passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
            RolesDTO rolesDTO = new RolesDTO(user.getRoles().getId(),user.getRoles().getName());
            listRoles.add(rolesDTO);
        }

       return listRoles;
    }





    @Override
    public String changePassByUser(ChangePasswordRequest changePasswordRequest) {
        Optional<UserEntity> user = usersRepository.findById(changePasswordRequest.id());
        if(user.isPresent()){

            if(!user.get().getEmail().equalsIgnoreCase(changePasswordRequest.email())){
               throw new UserException("This email does exits");
            }
            if(!passwordEncoder.matches(changePasswordRequest.oldPass(),user.get().getPassword())){
                throw  new UserException("Old password is incorrect");
            }
            UserEntity user1 = user.get();
            user1.setPassword(passwordEncoder.encode(changePasswordRequest.newPass()));
            usersRepository.save(user1);

            return "Change password successfully";
        }else {
            throw new UserException("This user ID is does exits");
        }
    }


    @Override
    public UserAuthenDTO getUserByLogin(LoginRequest loginRequest) {
        UserAuthenDTO userAuthenDTO = new UserAuthenDTO();
        if(!checkLogin(loginRequest).isEmpty()){
            UserEntity user = usersRepository.findUserEntitiesByEmail(loginRequest.getEmail());
           userAuthenDTO = convertUserEntityToUserAuthenDTO(user);
            userAuthenDTO.setListRoles(checkLogin(loginRequest));
        }
        return userAuthenDTO;
    }

    private UserAuthenDTO convertUserEntityToUserAuthenDTO (UserEntity user){

        UserAuthenDTO userAuthenDTO = new UserAuthenDTO();
        userAuthenDTO.setId(user.getId());
        userAuthenDTO.setNameUser(user.getFullName());
        String image ="";
        if(user.getAvatar() != null){
            image = baseUrl + user.getAvatar();
        }
        userAuthenDTO.setAvatar(image);
        userAuthenDTO.setEmail(user.getEmail());
        userAuthenDTO.setVersion(user.getTokenVersion());
        return userAuthenDTO;
    }

}
