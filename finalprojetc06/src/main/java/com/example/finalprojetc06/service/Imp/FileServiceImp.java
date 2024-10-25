package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.exeption.FileExeption;
import com.example.finalprojetc06.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileServiceImp implements FileService {

    @Value("${root.path}")
    private String root;



    @Override
    public void save(MultipartFile file) {
        try {
            Path pathRoot = Paths.get(root);
            if(!Files.exists(pathRoot)){
                Files.createDirectories(pathRoot);
            }
            Files.copy(file.getInputStream(),pathRoot.resolve(Objects.requireNonNull(file.getOriginalFilename())), StandardCopyOption.REPLACE_EXISTING);
        }catch (Exception e){
            throw new FileExeption("false file exeption");
        }

    }

    @Override
    public Resource load(String filename) {
        try{
            Path rootPath = Paths.get(root);
            Path file = rootPath.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists()){
                return resource;
            }else{
                throw new FileExeption("false upload filename");
            }
        }catch (Exception e){
            throw new FileExeption("error "+ e.getMessage());
        }
    }
}
