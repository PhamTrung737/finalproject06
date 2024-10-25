package com.example.finalprojetc06.controller;


import com.example.finalprojetc06.request.ProductRequest;
import com.example.finalprojetc06.request.ProductUpdate;
import com.example.finalprojetc06.response.BaseRespone;
import com.example.finalprojetc06.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> addProduct( ProductRequest product){

        BaseRespone baseRespone = new BaseRespone(200,"Success!",productService.addProduct(product));



        return  new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }

    @GetMapping("/{page:.+}/{pagesize:.+}")
    public ResponseEntity<?> getListProduct(@PathVariable int page,@PathVariable int pagesize){
        BaseRespone baseRespone = new BaseRespone(200,
                "!Success", productService.getListProduct(page,pagesize));

        return new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @GetMapping("/id=/{id:.+}")
    public ResponseEntity<?> getProductById(@PathVariable int id){
        BaseRespone baseRespone = new BaseRespone(200,"!Success",productService.getProductById(id));
        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @GetMapping("/category/{param:.+}/{page:.+}/{pagesize:.+}")
    public ResponseEntity<?> getProductByCategory(@PathVariable String param ,@PathVariable int page,@PathVariable int pagesize){
        BaseRespone baseRespone = new BaseRespone(200,"!Success",productService.getProductByCategory(param,page,pagesize));


        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @PostMapping("/delete/{id:.+}")
    public ResponseEntity<?> deleteProductById(@PathVariable int id){

        BaseRespone baseRespone = new BaseRespone(200,"!Success",
                productService.deleteProductById(id));
        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }



    @GetMapping("/connection/id={id:.+}/page={page:.+}/pagesize={pagesize:.+}")
    public ResponseEntity<?> getProductByIdConnection(@PathVariable int id,@PathVariable int page,@PathVariable int pagesize){
        BaseRespone baseRespone = new BaseRespone(200,"Success",
                productService.getProductByIdConnection(id,page,pagesize));
        return  new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @PostMapping("/update/id={id:.+}")
    public ResponseEntity<?> updateProductById(@PathVariable int id,ProductUpdate productUpdate){
        return new ResponseEntity<>(productService.updateProductById(id,productUpdate),HttpStatus.OK);
    }

    @PostMapping("/update/connection/id={id:.+}")
    public ResponseEntity<?> updateProductFollowConnection(@PathVariable int id, int idConnection){
        BaseRespone baseRespone = new BaseRespone(200,"Success",productService.updateProductFollowConnection(id,idConnection));
        return new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }
}
