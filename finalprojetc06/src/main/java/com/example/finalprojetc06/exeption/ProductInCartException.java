package com.example.finalprojetc06.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

@AllArgsConstructor
@Data
public class ProductInCartException extends RuntimeException{
    private String message;
}
