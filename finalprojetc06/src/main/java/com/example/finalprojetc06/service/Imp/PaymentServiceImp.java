package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.PaymentDTO;
import com.example.finalprojetc06.repository.PaymentRepository;
import com.example.finalprojetc06.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PaymentServiceImp implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    public List<PaymentDTO> getListPayment() {

        return paymentRepository.findAll().stream().map(item->{
            String url = "";
            if(item.getImage()!=null){
                url = baseUrl + item.getImage();
            }
            return new PaymentDTO(item.getId(),item.getName(),url);
        }).toList();
    }
}
