package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.ProductDTO;
import com.example.finalprojetc06.dto.ProductDetailDTO;
import com.example.finalprojetc06.dto.ProductLazyLoadDTO;
import com.example.finalprojetc06.entity.ProductEntity;
import com.example.finalprojetc06.request.ProductRequest;
import com.example.finalprojetc06.request.ProductUpdate;

import java.util.List;

public interface ProductService {
        ProductEntity addProduct(ProductRequest product);
        ProductLazyLoadDTO getListProduct(int page, int pageSize);
        ProductDetailDTO getProductById(int id);
        ProductLazyLoadDTO getProductByCategory(String category, int page, int pageSize);
        String deleteProductById(int id);
        ProductDetailDTO updateProductById(int id,ProductUpdate productUpdate);
        ProductLazyLoadDTO getProductByIdConnection(int idConnection,int page,int pageSize);
        ProductDetailDTO updateProductFollowConnection (int id,int idConnection);
}
