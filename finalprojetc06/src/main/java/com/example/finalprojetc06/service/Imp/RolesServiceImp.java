package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.RolesDTO;
import com.example.finalprojetc06.repository.RoleRepository;
import com.example.finalprojetc06.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesServiceImp implements RolesService {

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public List<RolesDTO> getListRole() {
        return roleRepository.findAll().stream().map(item->{
            return new RolesDTO(item.getId(),item.getName());
        }).toList();
    }
}
