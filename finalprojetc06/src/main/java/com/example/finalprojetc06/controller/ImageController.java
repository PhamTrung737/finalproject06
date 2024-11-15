package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.ImageBannerRequest;
import com.example.finalprojetc06.request.ImageProductRequest;
import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/add-product")
    public ResponseEntity<?> addImageProduct(ImageProductRequest imageProductRequest){
        BaseResponeOK baseResponeOK = new BaseResponeOK(
                imageService.addImage(imageProductRequest,null));

        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @PostMapping("/add-banner")
    public ResponseEntity<?> addImageBanner(ImageBannerRequest imageBannerRequest){

        BaseResponeOK baseResponeOK = new BaseResponeOK(
                imageService.addImage(null,imageBannerRequest));

        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @GetMapping("/list-image")
    public ResponseEntity<?> getListImage(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(imageService.getListImage());
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @DeleteMapping("/delete/id={id:.+}")
    public ResponseEntity<?> deleteImageById(@PathVariable int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(imageService.deleteImageById(id));
        return  new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }


}
