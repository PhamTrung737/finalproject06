package com.example.finalprojetc06.response;

import lombok.Data;

@Data
public class BaseResponeOK {
    private int statusCode=200;
    private String message = "Success";
    private Object content;

    public BaseResponeOK(Object content) {
        this.content = content;
    }
}
