package com.example.backend.service;

import com.example.backend.model.Config;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ConfigService {

    private Config config;

    public ConfigService() throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("config.json");
        this.config = mapper.readValue(resource.getInputStream(), Config.class);
    }

    public Config getConfig() {
        return config;
    }
}
