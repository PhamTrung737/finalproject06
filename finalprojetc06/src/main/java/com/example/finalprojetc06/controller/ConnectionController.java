package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.response.BaseRespone;
import com.example.finalprojetc06.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/connection")
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @GetMapping()
    public ResponseEntity<?> getAllConnection(){
        BaseRespone baseRespone = new BaseRespone(200,"!Success",connectionService.getAllConnection());


        return new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }
}
