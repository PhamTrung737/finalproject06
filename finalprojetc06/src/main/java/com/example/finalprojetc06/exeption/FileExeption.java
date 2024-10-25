package com.example.finalprojetc06.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.context.annotation.Configuration;

@Data
@AllArgsConstructor

public class FileExeption extends RuntimeException{
    private String messaga;
}
