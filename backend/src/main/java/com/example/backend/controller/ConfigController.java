package com.example.backend.controller;

import com.example.backend.model.Config;
import com.example.backend.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ConfigController {

    private final ConfigService configService;

    @Autowired
    public ConfigController(ConfigService configService) {
        this.configService = configService;
    }

    @GetMapping("/getConfig")
    public ResponseEntity<Config> getAppConfig() {
        // Fetch the config using the service
        Config config = configService.getConfig();
        return ResponseEntity.ok(config);
    }
}
