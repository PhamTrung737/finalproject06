package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.MoneyDTO;
import com.example.finalprojetc06.entity.MoneyEntity;
import com.example.finalprojetc06.repository.MoneyRepository;
import com.example.finalprojetc06.service.MoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@Service

public class MoneyServiceImp implements MoneyService {
    @Autowired
    private MoneyRepository moneyRepository;

    @Override
    public List<MoneyDTO> getListMoney() {
        return moneyRepository.findAll().stream().map(item->new MoneyDTO(item.getId(),item.getValue())).toList();
    }
}
