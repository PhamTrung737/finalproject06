package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.MaterialDTO;
import com.example.finalprojetc06.entity.MetarialEntity;
import com.example.finalprojetc06.exeption.MaterialException;
import com.example.finalprojetc06.repository.MetarialRepository;
import com.example.finalprojetc06.service.MatarialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialServiceImp implements MatarialService {

    @Autowired
    private MetarialRepository metarialRepository;

    @Override
    public List<MaterialDTO> getListMaterial() {

        return metarialRepository.findAll().stream().map(item->{
            return new MaterialDTO(item.getId(),item.getDescription());
        }).toList();
    }

    @Override
    public MaterialDTO addMaterial(String desc) {
        MetarialEntity metarial = new MetarialEntity();
        metarial.setDescription(desc);
        return convert(metarialRepository.save(metarial));
    }

    @Override
    public MaterialDTO updateMaterialById(String desc, int id) {
        Optional<MetarialEntity> metarial = metarialRepository.findById(id);
        if(metarial.isPresent()){
            MetarialEntity metarial1 = metarial.get();
            metarial1.setDescription(desc);
            return convert(metarialRepository.save(metarial1));
        }else {
            throw  new MaterialException("The material ID does exits");
        }
    }

    @Override
    public String deleteMaterialById(int id) {
        Optional<MetarialEntity> metarial = metarialRepository.findById(id);
        if(metarial.isPresent()){
            metarialRepository.deleteById(id);
            return "Delete material success";
        }else {
            throw  new MaterialException("The material ID does exits");
        }
    }

    private MaterialDTO convert (MetarialEntity metarial){
        return new MaterialDTO(metarial.getId(),metarial.getDescription());
    }
}
