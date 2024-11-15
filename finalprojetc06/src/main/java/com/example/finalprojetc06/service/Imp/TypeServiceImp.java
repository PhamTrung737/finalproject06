package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.TypeDTO;
import com.example.finalprojetc06.entity.TypeEntity;
import com.example.finalprojetc06.exeption.TypeException;
import com.example.finalprojetc06.repository.TypeRepository;
import com.example.finalprojetc06.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeServiceImp implements TypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Override
    public List<TypeDTO> getListType() {
        return typeRepository.findAll().stream().map(item->{
            return new TypeDTO(item.getId(),item.getDescription());
        }).toList();
    }

    @Override
    public TypeDTO addType(String  desc) {
        TypeEntity type1 = new TypeEntity();
        type1.setDescription(desc);
        return convertTypeEntityToTypeDTO(typeRepository.save(type1));

    }

    @Override
    public TypeDTO updateTypeById(String desc,int id) {
        Optional<TypeEntity> type1 = typeRepository.findById(id);
        if(type1.isPresent()){
            TypeEntity type2 = type1.get();
            type2.setDescription(desc);
            return  convertTypeEntityToTypeDTO(typeRepository.save(type2));
        }else {
            throw new TypeException("The type Id does exits");
        }
    }

    @Override
    public String deleteTypeById(int id) {
        Optional<TypeEntity> type1 = typeRepository.findById(id);
        if(type1.isPresent()){
            typeRepository.deleteById(id);
            return "Delete type success";
        }else {
            throw new TypeException("The type Id does exits");
        }
    }

    private TypeDTO convertTypeEntityToTypeDTO(TypeEntity type){
        return new TypeDTO(type.getId(),type.getDescription());
    }
}
