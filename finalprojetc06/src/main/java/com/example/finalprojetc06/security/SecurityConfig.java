package com.example.finalprojetc06.security;

import com.example.finalprojetc06.filter.CustomFilter;
import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, CustomAuthenProvider authenProvider) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .authenticationProvider(authenProvider)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsSource(){
        CorsConfiguration configurationSource = new CorsConfiguration();
        configurationSource.setAllowedOrigins(List.of("*"));
        configurationSource.setAllowedMethods(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configurationSource);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, HttpSession httpSession, CorsConfigurationSource corsSource, CustomFilter customFilter) throws Exception {
        return  http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsSource))
                .sessionManagement(session ->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request ->{
                    request.requestMatchers("/authen/**","/files/**","/cart/**","/money","/comment/**").permitAll();
                    request.requestMatchers(HttpMethod.GET , "/product/**","/connection/**","/category/**").permitAll();
                    request.requestMatchers("/**").hasRole("ADMIN");
                    request.anyRequest().authenticated();
                })
                .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
