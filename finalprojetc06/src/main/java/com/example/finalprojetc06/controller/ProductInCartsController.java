package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.dto.ProductInCartOutPutDTO;
import com.example.finalprojetc06.request.CheckOutCart;
import com.example.finalprojetc06.request.ProductInCartsRequest;
import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.CartsService;
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

    @Autowired
    private CartsService cartsService;


    @PostMapping("/add-product/user={user:.+}/payment={payment:.+}/money={money:.+}")
    public ResponseEntity<?> addProductInCarts(@RequestBody List<ProductInCartsRequest> listProduct,
                                               @PathVariable int user,
                                               @PathVariable int payment,
                                               @PathVariable int money){

        BaseResponeOK baseResponeOK = new BaseResponeOK(
                productInCartService.addListProductInCart(listProduct,user,payment,money));
        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @GetMapping("/id={id:.+}")
    public ResponseEntity<?> getListProductByUser(@PathVariable int id){

        ProductInCartOutPutDTO product = new ProductInCartOutPutDTO(cartsService.getCartTrue(true,id),
                productInCartService.getListProductInCartByUser(id));
        BaseResponeOK baseResponeOK = new BaseResponeOK(product);
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PostMapping("/payment-cart")
    public ResponseEntity<?> checkOutCart(CheckOutCart checkOutCart){

        BaseResponeOK baseResponeOK = new BaseResponeOK(
                productInCartService.checkOutCart(checkOutCart.idUser(),checkOutCart.idCart()));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @GetMapping("/list-product/id={id:.+}")
    public ResponseEntity<?> getProductByIdUser(@PathVariable int id){
        BaseResponeOK baseResponeOK=new BaseResponeOK(productInCartService.getListProductInCartsById(id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

}
