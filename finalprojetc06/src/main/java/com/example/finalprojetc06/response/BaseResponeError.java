package com.example.finalprojetc06.response;

import lombok.Data;


public record BaseResponeError(int statusCode,String message,Object content) {

}
