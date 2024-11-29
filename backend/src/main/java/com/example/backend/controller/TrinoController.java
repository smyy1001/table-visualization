package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.service.TrinoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trino")
public class TrinoController {

    @Autowired
    private TrinoService trinoService;

    @GetMapping("/query")
    public List<Map<String, Object>> executeQuery(@RequestParam String sql) {
        return trinoService.fetchTrinoData(sql);
    }

    @PostMapping("/query")
    public int executeInsertQuery(@RequestBody Map<String, Object> requestBody) {
        String sql = (String) requestBody.get("sql");
        List<Object> values = (List<Object>) requestBody.get("values");

        // Call the service to execute the INSERT query
        return trinoService.executeUpdateQuery(sql, values);
    }
}
