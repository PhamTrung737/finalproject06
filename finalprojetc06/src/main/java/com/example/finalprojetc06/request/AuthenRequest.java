package com.example.finalprojetc06.request;

import lombok.Data;

@Data
public class AuthenRequest {
    private String fullName;
    private String email;
    private String password;
}
