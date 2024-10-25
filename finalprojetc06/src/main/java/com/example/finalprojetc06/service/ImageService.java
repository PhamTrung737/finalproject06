package com.example.finalprojetc06.service;

import com.example.finalprojetc06.dto.BannerDTO;
import com.example.finalprojetc06.entity.ImageEntity;
import com.example.finalprojetc06.request.ImageBannerRequest;
import com.example.finalprojetc06.request.ImageProductRequest;

import java.util.List;

public interface ImageService {
    String getImageLogo();
    String getImageLogoHome();
    List<BannerDTO> getBanner();
    ImageEntity addImage(ImageProductRequest imageProductRequest, ImageBannerRequest imageBannerRequest);
}
