package com.example.finalprojetc06.dto;

import java.sql.Timestamp;

public record ProductInCartsDTO(int id, String product, int quantity, Timestamp createDay) {
}
