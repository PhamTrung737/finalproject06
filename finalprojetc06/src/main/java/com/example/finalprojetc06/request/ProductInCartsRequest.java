package com.example.finalprojetc06.request;


import java.sql.Timestamp;

public record ProductInCartsRequest(int idProduct, int quantity, Timestamp createDay) {
}
