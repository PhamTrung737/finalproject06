package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.MaterialDTO;

import java.util.List;

public interface MatarialService {
      List<MaterialDTO> getListMaterial();
      MaterialDTO addMaterial(String desc);
      MaterialDTO updateMaterialById (String desc ,int id);
      String deleteMaterialById(int id);
}
