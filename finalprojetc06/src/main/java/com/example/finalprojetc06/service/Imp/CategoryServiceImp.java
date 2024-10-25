package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.CategoryDTO;

import com.example.finalprojetc06.entity.CategoryEntity;
import com.example.finalprojetc06.exeption.CategoryException;
import com.example.finalprojetc06.repository.CategoryRepository;
import com.example.finalprojetc06.request.CategoryRequest;
import com.example.finalprojetc06.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;


    @Override
    public List<CategoryDTO> listCategory() {
        return categoryRepository.findAll().stream().map(item->{
            return new CategoryDTO(item.getId(),item.getName(),item.getParam());

        }).toList();

    }

    @Override
    public String addCategory(CategoryRequest categoryRequest) {
        String[] checkParam = categoryRequest.param().split("[,\\.\\s]");
        if(Arrays.stream(checkParam).toList().size()>1){
             return "param not regex";
        }else {
            CategoryEntity category = new CategoryEntity();
            category.setName(categoryRequest.name());
            category.setParam(categoryRequest.param());
            categoryRepository.save(category);
            return "add category success";
        }

    }

    @Override
    public String deleteCategory(int id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if(category.isPresent()){
            categoryRepository.deleteById(id);
            return "Delete Category Success";
        }else {
            throw new CategoryException("id category empty");
        }

    }

    @Override
    public CategoryEntity updateCategory(String name,String param,int id) {
        Optional<CategoryEntity> category1 = categoryRepository.findById(id);

        if(category1.isPresent()&&countString(param)==0){

           CategoryEntity category = category1.get();
           category.setParam(param);
           category.setName(name);

           return categoryRepository.save(category);

        }else {
            throw new CategoryException("category empty");
        }

    }


     int countString(String input) {
        return input.replaceAll("[^ ]", "").length();
    }

}
