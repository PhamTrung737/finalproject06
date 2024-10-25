package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.CategoryDTO;
import com.example.finalprojetc06.entity.CategoryEntity;
import com.example.finalprojetc06.request.CategoryRequest;


import java.util.List;
import java.util.Objects;

public interface CategoryService {
    List<CategoryDTO> listCategory();
    String addCategory(CategoryRequest categoryRequest);
    String deleteCategory(int id);
    CategoryEntity updateCategory(String name,String param,int id);
}
