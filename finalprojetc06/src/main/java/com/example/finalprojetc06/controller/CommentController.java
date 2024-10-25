package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.CommentRequest;
import com.example.finalprojetc06.response.BaseRespone;
import com.example.finalprojetc06.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/add-comment")
    public ResponseEntity<?> addComment(CommentRequest commentRequest){
        BaseRespone baseRespone = new BaseRespone(200,"Success",
                commentService.addComment(commentRequest));
        return new ResponseEntity<>(baseRespone, HttpStatus.OK);
    }

    @GetMapping("/product/id={id:.+}")
    public ResponseEntity<?> getCommentByIdProduct(@PathVariable int id){

        BaseRespone baseRespone = new BaseRespone(200,"Success",
                commentService.listCommentByIdProduct(id));
        return new ResponseEntity<>(baseRespone,HttpStatus.OK);
    }
}
