package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.ConnectionDTO;
import com.example.finalprojetc06.entity.ConnectionEntity;
import com.example.finalprojetc06.exeption.ConnectionException;
import com.example.finalprojetc06.repository.ConnectionRepository;
import com.example.finalprojetc06.request.ConnectionRequest;
import com.example.finalprojetc06.service.ConnectionService;
import com.example.finalprojetc06.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConnectionServiceImp implements ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Autowired
    private FileService fileService;

    @Override
    public List<ConnectionDTO> getAllConnection() {



         return connectionRepository.findAll().stream().map(item->{
            return new ConnectionDTO(item.getId(),baseUrl+item.getImage(),item.getDescription());
        }).toList();


    }

    @Override
    public ConnectionDTO addConnection(ConnectionRequest connectionRequest) {
        ConnectionEntity connection = new ConnectionEntity();
        connection.setDescription(connectionRequest.name());
        fileService.save(connectionRequest.file());
        connection.setImage(connectionRequest.file().getOriginalFilename());
        return  convertConnectionEntityToConnectionDTO(connectionRepository.save(connection));

    }

    @Override
    public ConnectionDTO updateConnectionById(int id, ConnectionRequest connectionRequest) {
        Optional<ConnectionEntity> connection = connectionRepository.findById(id);
        if(connection.isPresent()){
            ConnectionEntity connection1 = connection.get();
            if(!connection1.getImage().equals(connectionRequest.file().getOriginalFilename())){
                fileService.save(connectionRequest.file());
                connection1.setImage(connectionRequest.file().getOriginalFilename());
            }
            connection1.setDescription(connectionRequest.name());
            return convertConnectionEntityToConnectionDTO(connectionRepository.save(connection1));
        }else {
            throw  new ConnectionException("The connection Id does exits");
        }

    }

    @Override
    public String deleteConnectionById(int id) {
        Optional<ConnectionEntity> connection = connectionRepository.findById(id);
        if(connection.isPresent()){
            connectionRepository.deleteById(id);
            return "Delete connection success";
        }else {
            throw  new ConnectionException("The connection Id does exits");
        }

    }


    private ConnectionDTO convertConnectionEntityToConnectionDTO(ConnectionEntity connection){
        return new ConnectionDTO(connection.getId(),baseUrl+connection.getImage(),
                connection.getDescription());
    }
}

