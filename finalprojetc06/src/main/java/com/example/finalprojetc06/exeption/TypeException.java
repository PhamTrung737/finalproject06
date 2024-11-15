package com.example.finalprojetc06.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TypeException extends RuntimeException{
    private String message;
}
