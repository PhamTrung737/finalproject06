package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.ConnectionDTO;
import com.example.finalprojetc06.request.ConnectionRequest;

import java.util.List;

public interface ConnectionService {
    List<ConnectionDTO> getAllConnection();
    ConnectionDTO addConnection(ConnectionRequest connectionRequest);
    ConnectionDTO updateConnectionById(int id,ConnectionRequest connectionRequest);
    String deleteConnectionById (int id);
}
