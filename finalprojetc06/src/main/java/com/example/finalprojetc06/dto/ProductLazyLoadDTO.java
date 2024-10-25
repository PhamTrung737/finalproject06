package com.example.finalprojetc06.dto;

import java.util.List;

public record ProductLazyLoadDTO (int page,int totalProduct, List<ProductDTO> listProduct){
}
