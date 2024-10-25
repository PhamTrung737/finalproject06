package com.example.finalprojetc06.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
public class CategoryException extends RuntimeException{
    private String message;
}
