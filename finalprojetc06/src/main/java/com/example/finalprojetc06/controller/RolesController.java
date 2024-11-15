package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RolesController {

    @Autowired
    private RolesService rolesService;

    @GetMapping("/list-roles")
    public ResponseEntity<?> getListRoles(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(rolesService.getListRole());
        return  new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }
}
