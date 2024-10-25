package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.AuthenRequest;
import com.example.finalprojetc06.request.LoginRequest;
import com.example.finalprojetc06.response.BaseRespone;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

        BaseRespone baseRespone = new BaseRespone(200,"Success",
                authenService.addUser(authenRequest));

        return new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> checkLogin(LoginRequest loginRequest) throws JsonProcessingException {

        UsernamePasswordAuthenticationToken authenToken =
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
        Authentication authentication =  authenticationManager.authenticate(authenToken);


        List<GrantedAuthority> listRole =(List<GrantedAuthority>) authentication.getAuthorities();

        String data = objectMapper.writeValueAsString(listRole);

        String token = jwtsToken.generateToke(data);

        BaseRespone baseRespone = new BaseRespone(200,"success",token);

        return new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }
}
