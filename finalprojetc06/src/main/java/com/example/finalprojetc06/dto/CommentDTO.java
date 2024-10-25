package com.example.finalprojetc06.dto;

import java.sql.Timestamp;

public record CommentDTO(int id, String avatar, String nameUser, String description, int evaluate, Timestamp createDay) {
}
