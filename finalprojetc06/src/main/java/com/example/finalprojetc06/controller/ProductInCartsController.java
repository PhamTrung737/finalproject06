package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.ProductInCartsRequest;
import com.example.finalprojetc06.response.BaseRespone;
import com.example.finalprojetc06.service.ProductInCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class ProductInCartsController {

    @Autowired
    private ProductInCartService productInCartService;

    @PostMapping("/add-product/user={user:.+}/payment={payment:.+}/money={money:.+}")
    public ResponseEntity<?> addProductInCarts(@RequestBody List<ProductInCartsRequest> listProduct,
                                               @PathVariable int user,
                                               @PathVariable int payment,
                                               @PathVariable int money){
        productInCartService.addListProductInCart(listProduct,user,payment,money);
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    @GetMapping("/id={id:.+}")
    public ResponseEntity<?> getListProductByUser(@PathVariable int id){
        BaseRespone baseRespone = new BaseRespone(200,"Success",productInCartService.getListProductInCartByUser(id));
        return new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }
}
