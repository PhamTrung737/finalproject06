package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/type")
public class TypeController {

    @Autowired
    private TypeService typeService;

    @GetMapping
    public ResponseEntity<?> getListType(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(typeService.getListType());
        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @PostMapping("/add-type")
    public ResponseEntity<?> addType(String desc){
        BaseResponeOK baseResponeOK = new BaseResponeOK(typeService.addType(desc));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PutMapping("/update-type")
    public ResponseEntity<?> updateTypeById(String desc,int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(typeService.updateTypeById(desc,id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @DeleteMapping("/delete-type/id={id:.+}")
    public ResponseEntity<?> deletetypeByID(@PathVariable int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(typeService.deleteTypeById(id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }
}
