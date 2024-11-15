package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.dto.UserAuthenDTO;
import com.example.finalprojetc06.request.AuthenRequest;
import com.example.finalprojetc06.request.ChangePasswordRequest;
import com.example.finalprojetc06.request.LoginRequest;
import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.AuthenService;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/authen")
public class AuthenController {

    @Autowired
    private AuthenService authenService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtsToken jwtsToken;

    @PostMapping("/signup")
    public ResponseEntity<?> addUser( AuthenRequest authenRequest){

        BaseResponeOK baseResponeOK = new BaseResponeOK(
                authenService.addUser(authenRequest));

        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> checkLogin(LoginRequest loginRequest) throws  JsonProcessingException {
        BaseResponeOK baseResponeOK = new BaseResponeOK( generateToke(loginRequest));

        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PostMapping("/change-pass")
    public ResponseEntity<?> changePasswordUser(ChangePasswordRequest changePasswordRequest) throws JsonProcessingException {


        BaseResponeOK baseResponeOK = new BaseResponeOK(authenService.changePassByUser(changePasswordRequest));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
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
