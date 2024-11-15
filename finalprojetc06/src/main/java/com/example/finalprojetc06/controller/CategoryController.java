package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.CategoryRequest;
import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> getListCategory() {
        BaseResponeOK baseResponeOK = new BaseResponeOK(categoryService.listCategory());
        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addCategory(CategoryRequest categoryRequest){

       BaseResponeOK baseResponeOK = new BaseResponeOK(categoryService.addCategory(categoryRequest));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);

    }

    @GetMapping("/delete/id={id:.+}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(categoryService.deleteCategory(id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PostMapping("/update/id={id:.+}")
    public ResponseEntity<?> updateCategoryById(@PathVariable int id,@RequestParam String name,@RequestParam String param){
        BaseResponeOK baseResponeOK = new BaseResponeOK(categoryService.updateCategory(name,param,id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }
}
