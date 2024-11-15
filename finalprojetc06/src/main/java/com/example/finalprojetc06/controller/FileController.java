package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.FileService;
import com.example.finalprojetc06.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/files")

public class FileController {
    @Autowired
    private FileService fileService;

    @Autowired
    private ImageService imageService;

    @GetMapping("/{filename:.+}")
    public ResponseEntity<?> uploadFile(@PathVariable String filename){
        Resource file = fileService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("/logo")
    public ResponseEntity<?> getImageLogo(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(imageService.getImageLogo());

        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @GetMapping("/logo-home")
    public ResponseEntity<?> getImageLogoHome(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(imageService.getImageLogoHome());

        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @GetMapping("/banner")
    public ResponseEntity<?> getImageBanner(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(imageService.getBanner());

        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }
}
