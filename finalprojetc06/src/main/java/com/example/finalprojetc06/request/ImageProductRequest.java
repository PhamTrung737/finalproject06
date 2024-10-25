package com.example.finalprojetc06.request;

import org.springframework.web.multipart.MultipartFile;

public record ImageProductRequest(MultipartFile image, int idProduct) {
}
