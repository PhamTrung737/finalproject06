package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.MatarialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/material")
public class MatarialController {

    @Autowired
    private MatarialService matarialService;

    @GetMapping
    public ResponseEntity<?> getListMaterial (){
        BaseResponeOK baseResponeOK = new BaseResponeOK(matarialService.getListMaterial());
        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @PostMapping("/add-material")
    public ResponseEntity<?> addMaterial(String desc){
        BaseResponeOK baseResponeOK = new BaseResponeOK(matarialService.addMaterial(desc));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PutMapping("/update-material")
    public ResponseEntity<?> updateMaterial(String desc,int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(matarialService.updateMaterialById(desc,id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @DeleteMapping("/delete-material/id={id:.+}")
    public ResponseEntity<?> deleteMaterial(@PathVariable int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(matarialService.deleteMaterialById(id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

}
