package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.ImageBannerRequest;
import com.example.finalprojetc06.request.ImageProductRequest;
import com.example.finalprojetc06.response.BaseRespone;
import com.example.finalprojetc06.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/add-product")
    public ResponseEntity<?> addImageProduct(ImageProductRequest imageProductRequest){
        BaseRespone baseRespone = new BaseRespone(200,"Success",
                imageService.addImage(imageProductRequest,null));

        return new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }

    @PostMapping("/add-banner")
    public ResponseEntity<?> addImageBanner(ImageBannerRequest imageBannerRequest){
        BaseRespone baseRespone = new BaseRespone(200,"Success",
                imageService.addImage(null,imageBannerRequest));

        return new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }
}
