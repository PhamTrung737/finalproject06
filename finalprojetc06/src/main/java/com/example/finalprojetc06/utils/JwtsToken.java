package com.example.finalprojetc06.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.util.Date;

@Component
public class JwtsToken {

     @Value("${jwts.key}")
     private  String jwtsKey;

    private int expriredTime = 1000 * 60 * 60 * 24 * 5;

    public String generateToke(String data){
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtsKey));
        Date currentDate = new Date();
        long miliSecondFuture = currentDate.getTime() + expriredTime;
        Date dateFuture = new Date(miliSecondFuture);
        return Jwts.builder().subject(data).signWith(secretKey).expiration(dateFuture).compact();

    }

    public String decodeToken(String token){
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(jwtsKey));
        return Jwts.parser()
                .verifyWith(secretKey).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

}
