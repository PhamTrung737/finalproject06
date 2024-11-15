package com.example.finalprojetc06.controller;

import com.example.finalprojetc06.request.ConnectionRequest;
import com.example.finalprojetc06.response.BaseResponeOK;
import com.example.finalprojetc06.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/connection")
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @GetMapping()
    public ResponseEntity<?> getAllConnection(){
        BaseResponeOK baseResponeOK = new BaseResponeOK(connectionService.getAllConnection());


        return new ResponseEntity<>(baseResponeOK, HttpStatus.OK);
    }

    @PostMapping("/add-connection")
    public ResponseEntity<?> addConnection(ConnectionRequest connectionRequest){

        BaseResponeOK baseResponeOK = new BaseResponeOK(connectionService.addConnection(connectionRequest));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @PutMapping("/update-connetion/id={id:.+}")
    public ResponseEntity<?> updateConnectionById(@PathVariable int id,ConnectionRequest connectionRequest){
        BaseResponeOK baseResponeOK = new BaseResponeOK(connectionService.updateConnectionById(id,connectionRequest));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }

    @DeleteMapping("/delete-connection/id={id:.+}")
    public ResponseEntity<?> deleteConnectionById(@PathVariable int id){
        BaseResponeOK baseResponeOK = new BaseResponeOK(connectionService.deleteConnectionById(id));
        return new ResponseEntity<>(baseResponeOK,HttpStatus.OK);
    }
}
