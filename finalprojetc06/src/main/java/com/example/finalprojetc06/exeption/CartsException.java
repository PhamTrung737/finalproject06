package com.example.finalprojetc06.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartsException extends RuntimeException{
    private String message;
}
