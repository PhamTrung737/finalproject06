package com.example.finalprojetc06.controller;


import com.example.finalprojetc06.request.ProductRequest;
import com.example.finalprojetc06.request.ProductUpdate;
import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> addProduct( ProductRequest product){

        BaseResponeOK baseResponeOK = new BaseResponeOK(productService.addProduct(product));



        return  new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @GetMapping("/{page:.+}/{pagesize:.+}")
    public ResponseEntity<?> getListProduct(@PathVariable int page,@PathVariable int pagesize){
        BaseResponeOK baseResponeOK = new BaseResponeOK( productService.getListProduct(page,pagesize));

        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @GetMapping("/id=/{id:.+}")
    public ResponseEntity<?> getProductById(@PathVariable int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(productService.getProductById(id));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @GetMapping("/category/{param:.+}/{page:.+}/{pagesize:.+}")
    public ResponseEntity<?> getProductByCategory(@PathVariable String param ,@PathVariable int page,@PathVariable int pagesize){
        BaseResponeOK baseResponeOK = new BaseResponeOK(productService.getProductByCategory(param,page,pagesize));


        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PostMapping("/delete/{id:.+}")
    public ResponseEntity<?> deleteProductById(@PathVariable int id){

        BaseResponeOK baseResponeOK = new BaseResponeOK(
                productService.deleteProductById(id));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }



    @GetMapping("/connection/id={id:.+}/page={page:.+}/pagesize={pagesize:.+}")
    public ResponseEntity<?> getProductByIdConnection(@PathVariable int id,@PathVariable int page,@PathVariable int pagesize){
        BaseResponeOK baseResponeOK = new BaseResponeOK(
                productService.getProductByIdConnection(id,page,pagesize));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PostMapping("/update/id={id:.+}")
    public ResponseEntity<?> updateProductById(@PathVariable int id,ProductUpdate productUpdate){
        BaseResponeOK baseResponeOK = new BaseResponeOK(productService.updateProductById(id,productUpdate));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PostMapping("/update/connection/id={id:.+}")
    public ResponseEntity<?> updateProductFollowConnection(@PathVariable int id, int idConnection){
        BaseResponeOK baseResponeOK = new BaseResponeOK(productService.updateProductFollowConnection(id,idConnection));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @GetMapping("/list-product-admin")
    public ResponseEntity<?> getListProductByRoleAdmin(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(productService.getAllProductByRoleAdmin());
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }
}
