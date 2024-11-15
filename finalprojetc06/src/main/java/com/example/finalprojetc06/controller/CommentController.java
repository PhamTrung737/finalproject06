package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.CommentRequest;
import com.example.finalprojetc06.response.BaseResponeOK;
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
        System.out.println(commentRequest);
        BaseResponeOK baseResponeOK = new BaseResponeOK(
                commentService.addComment(commentRequest));
        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @GetMapping("/product/id={id:.+}")
    public ResponseEntity<?> getCommentByIdProduct(@PathVariable int id){

        BaseResponeOK baseResponeOK = new BaseResponeOK(
                commentService.listCommentByIdProduct(id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }
}
