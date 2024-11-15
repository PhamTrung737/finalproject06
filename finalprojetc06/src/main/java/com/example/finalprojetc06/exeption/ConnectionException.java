package com.example.finalprojetc06.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConnectionException extends  RuntimeException{
    private String message;
}
