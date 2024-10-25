package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.ProductInCartByUserDTO;
import com.example.finalprojetc06.dto.ProductInCartsDTO;
import com.example.finalprojetc06.request.ProductInCartsRequest;

import java.util.List;

public interface ProductInCartService {
    List<ProductInCartsDTO> addListProductInCart(List<ProductInCartsRequest> listProduct,int idUser,int idPayment,int idMoney);
    List<ProductInCartByUserDTO> getListProductInCartByUser(int idUser);
}
