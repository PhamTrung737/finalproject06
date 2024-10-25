package com.example.finalprojetc06.request;

public record ProductUpdate(double price,String name,
                            String description,int idType,String size,
                            int idMetarial,int idCategory) {
}
