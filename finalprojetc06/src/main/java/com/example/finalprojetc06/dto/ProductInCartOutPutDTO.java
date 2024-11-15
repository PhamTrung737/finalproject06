package com.example.finalprojetc06.dto;

import java.util.List;

public record ProductInCartOutPutDTO(int idCart, List<ProductInCartByUserDTO> listProduct) {
}
