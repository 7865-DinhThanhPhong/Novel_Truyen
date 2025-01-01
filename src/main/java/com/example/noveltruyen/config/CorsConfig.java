package com.example.noveltruyen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Cho phép tất cả các endpoint trong /api
                        .allowedOrigins("http://localhost:5173") // Cho phép origin của frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Cho phép các phương thức HTTP
                        .allowedHeaders("*"); // Cho phép tất cả các header
            }
        };
    }
}