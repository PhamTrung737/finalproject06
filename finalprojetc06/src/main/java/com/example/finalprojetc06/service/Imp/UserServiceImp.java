package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.RolesDTO;
import com.example.finalprojetc06.dto.UserAuthenDTO;
import com.example.finalprojetc06.entity.RolesEntity;
import com.example.finalprojetc06.entity.UserEntity;
import com.example.finalprojetc06.exeption.UserException;
import com.example.finalprojetc06.repository.RoleRepository;
import com.example.finalprojetc06.repository.UsersRepository;
import com.example.finalprojetc06.request.LogOutAllDTO;
import com.example.finalprojetc06.request.UpdateUserRequest;
import com.example.finalprojetc06.service.FileService;
import com.example.finalprojetc06.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UsersRepository usersRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FileService fileService;

    @Override
    public List<UserAuthenDTO> getListUser() {

       return usersRepository.findAll().stream().map(item->{
           String url = "";
           if(item.getAvatar()!=null){
               url = baseUrl+item.getAvatar();
           }
           UserAuthenDTO userAuthenDTO = new UserAuthenDTO();
           userAuthenDTO.setId(item.getId());
           userAuthenDTO.setNameUser(item.getFullName());
           userAuthenDTO.setAvatar(url);
           userAuthenDTO.setEmail(item.getEmail());
           RolesDTO rolesDTO = new RolesDTO(item.getRoles().getId(),item.getRoles().getName());
           userAuthenDTO.setRoles(rolesDTO);
           return  userAuthenDTO;
       }).toList();
    }

    @Override
    @Transactional
    public String updateUserById(UpdateUserRequest userRequest) {
        Optional<UserEntity> user = usersRepository.findById((userRequest.id()));
        Optional<RolesEntity> roles = roleRepository.findById(userRequest.idRole());
        if(user.isPresent()&&roles.isPresent()){
            UserEntity user1 = user.get();
            user1.setId(userRequest.id());
            user1.setRoles(roles.get());
            user1.setFullName(userRequest.fullName());
            usersRepository.save(user1);
            return  "Update user successfully";
        }else {
            throw new UserException("The user ID or role ID does not exist");
        }

    }

    @Override
    public String deleteUserById(int id) {
        Optional<UserEntity> user = usersRepository.findById(id);
        if(user.isPresent()){
            usersRepository.deleteById(id);
            return "Delete user successfully";
        }else {
            throw  new UserException("The user ID does not exist.");
        }

    }

    @Override
    public String updateAvatarById(int id, MultipartFile file) {
        Optional<UserEntity> user = usersRepository.findById(id);
        if(user.isPresent()){
            fileService.save(file);
            UserEntity user1 = user.get();
            user1.setAvatar(file.getOriginalFilename());
            UserEntity user2 = usersRepository.save(user1);
            return baseUrl+user2.getAvatar();
        }else {
            throw  new UserException("The user ID does not exist.");
        }

    }

    @Override
    public UserAuthenDTO getUserById(int id) {
        Optional<UserEntity> user = usersRepository.findById(id);
        if(user.isPresent()){
            UserAuthenDTO userAuthenDTO = new UserAuthenDTO();
            userAuthenDTO.setNameUser(user.get().getFullName());
            String url = "";
            if(user.get().getAvatar()!=null){
                url = baseUrl+user.get().getAvatar();
            }
            userAuthenDTO.setAvatar(url);
            userAuthenDTO.setEmail(user.get().getEmail());
            userAuthenDTO.setVersion(user.get().getTokenVersion());

            return userAuthenDTO;
        }else {
            throw  new UserException("The user ID does not exist.");
        }

    }

    @Override
    public UserAuthenDTO LogOutAllBowser(LogOutAllDTO logOutAllDTO) {
        Optional<UserEntity> user = usersRepository.findById(logOutAllDTO.id());
        if(user.isPresent()){
            UserEntity user1 = user.get();
            user1.setTokenVersion(user.get().getTokenVersion()+1);
            UserEntity user2= usersRepository.save(user1);
            UserAuthenDTO userAuthenDTO = new UserAuthenDTO();
            userAuthenDTO.setId(user2.getId());
            userAuthenDTO.setNameUser(user2.getFullName());
            String url = "";
            if(user2.getAvatar()!=null){
                url = baseUrl+user.get().getAvatar();
            }
            userAuthenDTO.setAvatar(url);
            userAuthenDTO.setEmail(user.get().getEmail());

            RolesDTO rolesDTO = new RolesDTO(user2.getRoles().getId(),user2.getRoles().getName());
            List<RolesDTO> listRoles = new ArrayList<RolesDTO>();
            listRoles.add(rolesDTO);
            userAuthenDTO.setListRoles(listRoles);
            return userAuthenDTO;
        }else {
            throw new UserException("This user ID does exist");
        }

    }
}
