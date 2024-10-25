package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.ConnectionDTO;
import com.example.finalprojetc06.repository.ConnectionRepository;
import com.example.finalprojetc06.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ConnectionServiceImp implements ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    private ProductServiceImp productServiceImp;

    @Override
    public List<ConnectionDTO> getAllConnection() {



         return connectionRepository.findAll().stream().map(item->{
            return new ConnectionDTO(item.getId(),baseUrl+item.getImage(),item.getDescription());
        }).toList();


    }
}
