package com.example.finalprojetc06.response;

import lombok.Data;

import java.util.Objects;

public record BaseRespone(int statusCode,String message,Object content) {



}
