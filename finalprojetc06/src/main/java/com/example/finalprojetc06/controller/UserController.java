package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.dto.UserAuthenDTO;
import com.example.finalprojetc06.request.LogOutAllDTO;
import com.example.finalprojetc06.request.LoginRequest;
import com.example.finalprojetc06.request.UpdateUserRequest;
import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.AuthenService;
import com.example.finalprojetc06.service.UserService;
import com.example.finalprojetc06.utils.JwtsToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

   @Autowired
    private UserService userService;

    @Autowired
    private AuthenService authenService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtsToken jwtsToken;

   @GetMapping("/list-user")
    public ResponseEntity<?> getListUser (){
       BaseResponeOK baseResponeOK = new BaseResponeOK(userService.getListUser());
       return  new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
   }

   @PostMapping("/update-user")
    public ResponseEntity<?> updateUserById(UpdateUserRequest userRequest){

       BaseResponeOK baseResponeOK = new BaseResponeOK(userService.updateUserById(userRequest));

       return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
   }

   @DeleteMapping("/delete/:{id:.+}")
    public ResponseEntity<?> deleteUserById(@PathVariable int id){
       BaseResponeOK baseResponeOK = new BaseResponeOK(userService.deleteUserById(id));
       return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
   }

   @PostMapping("/upload-avatar/id={id:.+}")
    public ResponseEntity<?> uploadAvatarById(@PathVariable int id, MultipartFile file){

       BaseResponeOK baseResponeOK = new BaseResponeOK(userService.updateAvatarById(id,file));
       return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
   }

   @GetMapping("/detail-user/id={id:.+}")
    public ResponseEntity<?> getUserById(@PathVariable int id){
       BaseResponeOK baseResponeOK =new BaseResponeOK(userService.getUserById(id));
       return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
   }

   @PutMapping("/log-out-all")
    public ResponseEntity<?> logOutAllBowser(LogOutAllDTO logOutAllDTO) throws JsonProcessingException {
       UserAuthenDTO userAuthenDTO = userService.LogOutAllBowser(logOutAllDTO);
       LoginRequest loginRequest = new LoginRequest();
       loginRequest.setEmail(userAuthenDTO.getEmail());
       loginRequest.setPassword(logOutAllDTO.newPass());
       userAuthenDTO.setToken(generateToke(loginRequest).getToken());
       BaseResponeOK baseResponeOK = new BaseResponeOK(userAuthenDTO);
       return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
   }

    public UserAuthenDTO generateToke (LoginRequest loginRequest) throws JsonProcessingException {
        UsernamePasswordAuthenticationToken authenToken =
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
        Authentication authentication =  authenticationManager.authenticate(authenToken);


        List<GrantedAuthority> listRole =(List<GrantedAuthority>) authentication.getAuthorities();
        String data = objectMapper.writeValueAsString(listRole);

        UserAuthenDTO userAuthenDTO = authenService.getUserByLogin(loginRequest);
        String token = jwtsToken.generateToke(data, userAuthenDTO.getVersion(),userAuthenDTO.getId());

        userAuthenDTO.setToken(token);
        return userAuthenDTO;
    }
}
