package com.example.finalprojetc06.dto;

import java.util.List;

public record ProductDetailDTO(
        int id,
        String name,
        double price,
        List<ImageDTO> image,
        String type,
        String material,
        String description,
        String size) {
}
