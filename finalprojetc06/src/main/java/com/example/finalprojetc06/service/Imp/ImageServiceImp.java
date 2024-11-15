package com.example.finalprojetc06.service.Imp;

import com.example.finalprojetc06.dto.BannerDTO;
import com.example.finalprojetc06.dto.ListImageDTO;
import com.example.finalprojetc06.entity.ImageEntity;
import com.example.finalprojetc06.entity.ProductEntity;
import com.example.finalprojetc06.exeption.ImageException;
import com.example.finalprojetc06.repository.ImageRepository;
import com.example.finalprojetc06.request.ImageBannerRequest;
import com.example.finalprojetc06.request.ImageProductRequest;
import com.example.finalprojetc06.service.FileService;
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

    @Autowired
    private FileService fileService;

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
            throw new ImageException("The image logo home does not exist");
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
            fileService.save(imageBannerRequest.image());
            image.setImage(imageBannerRequest.image().getOriginalFilename());
            image.setBanner(true);
        }
        if(imageProductRequest != null){
            fileService.save(imageProductRequest.image());
            image.setImage(imageProductRequest.image().getOriginalFilename());
            ProductEntity product = new ProductEntity();
            product.setId(imageProductRequest.idProduct());
            image.setProducts(product);
        }

        return imageRepository.save(image);
    }

    @Override
    public List<ListImageDTO> getListImage() {
        return imageRepository.findAll().stream().map(items->{
            String url="";
            String type= "";
            if(items.getImage()!=null){
                url= baseUrl+items.getImage();
            }
            if(items.isBanner()){
                type="BANNER";
            }
            if(!items.isBanner()&&items.getProducts()==null){
                type="LOGO";
            }
            if(items.getProducts() != null){
                type = items.getProducts().getName();
            }
            return new ListImageDTO(items.getId(),url,type);

        }).toList();
    }

    @Override
    public String deleteImageById(int id) {
        Optional<ImageEntity> image= imageRepository.findById(id);
        if(image.isPresent()&&id>2){
            imageRepository.deleteById(id);
            return "Delete image success";
        }else {
            throw new ImageException("The image ID does not exist, or that ID is not allowed to be deleted.");
        }
    }
}
