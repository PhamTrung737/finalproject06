package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.TypeDTO;

import java.util.List;

public interface TypeService {
    List<TypeDTO> getListType();
    TypeDTO addType(String desc);
    TypeDTO updateTypeById (String desc,int id);
    String deleteTypeById(int id);
}
