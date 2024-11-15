package com.example.finalprojetc06.request;

public record ChangePasswordRequest(int id,String email,String oldPass,String newPass) {
}
