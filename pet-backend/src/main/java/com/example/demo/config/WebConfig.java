package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig
implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry
    ) {

        registry
            .addResourceHandler(
                "/profile-images/**"
            )
            .addResourceLocations(
                "file:///src/main/resources/static/uploads/profile/"
            );
    }
}