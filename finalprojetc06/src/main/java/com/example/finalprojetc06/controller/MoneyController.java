package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.response.BaseRespone;
import com.example.finalprojetc06.service.MoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/money")

public class MoneyController {

    @Autowired
    private MoneyService moneyService;

    @GetMapping
    public ResponseEntity<?> getMoney(){
        BaseRespone baseRespone = new BaseRespone(200,"!Success",moneyService.getListMoney());

        return new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }
}
