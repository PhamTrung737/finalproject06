package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.entity.CategoryEntity;
import com.example.finalprojetc06.request.CategoryRequest;
import com.example.finalprojetc06.response.BaseRespone;
import com.example.finalprojetc06.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> getListCategory() {
        BaseRespone baseRespone = new BaseRespone(200,"Success",categoryService.listCategory());
        return new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addCategory(CategoryRequest categoryRequest){
        System.out.println(categoryRequest);
       BaseRespone baseRespone = new BaseRespone(200,"!Success",categoryService.addCategory(categoryRequest));
        return new ResponseEntity<>(baseRespone,HttpStatus.OK);

    }

    @GetMapping("/delete/id={id:.+}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable int id){
        BaseRespone baseRespone = new BaseRespone(200,"!Success",categoryService.deleteCategory(id));
        return new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }

    @PostMapping("/update/id={id:.+}")
    public ResponseEntity<?> updateCategoryById(@PathVariable int id,@RequestParam String name,@RequestParam String param){
        BaseRespone baseRespone = new BaseRespone(200,"!Success",categoryService.updateCategory(name,param,id));
        return new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }
}
