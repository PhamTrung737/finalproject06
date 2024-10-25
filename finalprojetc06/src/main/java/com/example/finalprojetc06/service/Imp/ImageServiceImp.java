package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.BannerDTO;
import com.example.finalprojetc06.entity.ImageEntity;
import com.example.finalprojetc06.entity.ProductEntity;
import com.example.finalprojetc06.exeption.ImageException;
import com.example.finalprojetc06.repository.ImageRepository;
import com.example.finalprojetc06.request.ImageBannerRequest;
import com.example.finalprojetc06.request.ImageProductRequest;
import com.example.finalprojetc06.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImp implements ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    public String getImageLogo() {
        String link = "";
        Optional<ImageEntity> image= imageRepository.findById(2);
        if(image.isPresent()){
            ImageEntity img = image.get();
            link =baseUrl+ img.getImage();
        }else {
            throw new ImageException("logo empty");
        }

        return link;


    }

    @Override
    public String getImageLogoHome() {
        String link = "";
        Optional<ImageEntity> image= imageRepository.findById(1);
        if(image.isPresent()){
            ImageEntity img = image.get();
            link =baseUrl+ img.getImage();
        }else {
            throw new ImageException("logo home empty");
        }

        return link;
    }

    @Override
    public List<BannerDTO> getBanner() {
       return imageRepository.findByBanner(true).stream().map(item->new BannerDTO(item.getId(),baseUrl+item.getImage())).toList();
    }

    @Override
    public ImageEntity addImage(ImageProductRequest imageProductRequest, ImageBannerRequest imageBannerRequest) {
        ImageEntity  image = new ImageEntity();
        if(imageBannerRequest != null){
            image.setImage(imageBannerRequest.image().getOriginalFilename());
            image.setBanner(imageBannerRequest.idBanner());
        }
        if(imageProductRequest != null){
            image.setImage(imageProductRequest.image().getOriginalFilename());
            ProductEntity product = new ProductEntity();
            product.setId(imageProductRequest.idProduct());
            image.setProducts(product);
        }

        return imageRepository.save(image);
    }
}
