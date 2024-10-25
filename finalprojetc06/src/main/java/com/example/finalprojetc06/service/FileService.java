package com.example.finalprojetc06.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
public interface FileService {
     void save(MultipartFile file);
     Resource load(String filename);
}
