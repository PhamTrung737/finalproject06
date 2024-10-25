package com.example.finalprojetc06.filter;

import com.example.finalprojetc06.dto.AuthorityDTO;
import com.example.finalprojetc06.utils.JwtsToken;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class CustomFilter extends OncePerRequestFilter {


    @Autowired
    private  JwtsToken jwtsToken;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            String authorHeader = request.getHeader("Authorization");
            if(authorHeader != null && authorHeader.startsWith("Bearer ")){
                String token = authorHeader.substring(7);
                String data = jwtsToken.decodeToken(token);

                if(data != null){
                    List<AuthorityDTO> authorityDTOS = objectMapper.readValue(data, new TypeReference<List<AuthorityDTO>>() {
                    });

                    List<SimpleGrantedAuthority> authorityList = authorityDTOS.stream()
                            .map(item -> new SimpleGrantedAuthority(item.authority())).toList();

                    UsernamePasswordAuthenticationToken authenToken =
                            new UsernamePasswordAuthenticationToken("","",authorityList);

                    SecurityContext context = SecurityContextHolder.getContext();
                    context.setAuthentication(authenToken);

                }
            }
            filterChain.doFilter(request,response);
    }
}
