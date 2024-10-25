package com.example.finalprojetc06.request;

import java.sql.Timestamp;
public record CommentRequest(String content, int evaluate, int idUser, int idProduct, Timestamp createDay) {
}
