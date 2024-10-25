package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.CommentDTO;
import com.example.finalprojetc06.request.CommentRequest;

import java.util.List;

public interface CommentService {
     CommentDTO addComment(CommentRequest commentRequest);
     List<CommentDTO> listCommentByIdProduct(int idProduct);
}
