package com.example.backend.controller;

import com.example.backend.service.TrinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trino")
public class TrinoController {

    @Autowired
    private TrinoService trinoService;

    @GetMapping("/query")
    public List<Map<String, Object>> executeQuery(@RequestParam String sql) {
        return trinoService.fetchData(sql);
    }

    @PostMapping("/update")
    public int executeUpdate(@RequestBody Map<String, Object> requestBody) {
        String sql = (String) requestBody.get("sql");
        List<Object> values = (List<Object>) requestBody.get("values");
        return trinoService.updateData(sql, values.toArray());
    }

    @PostMapping("/insert")
    public int executeInsert(@RequestBody Map<String, Object> requestBody) {
        String sql = (String) requestBody.get("sql");
        List<Object> values = (List<Object>) requestBody.get("values");
        return trinoService.insertData(sql, values.toArray());
    }

    @DeleteMapping("/delete")
    public int executeDelete(@RequestBody Map<String, Object> requestBody) {
        String sql = (String) requestBody.get("sql");
        List<Object> values = (List<Object>) requestBody.get("values");

        if (sql == null || sql.isEmpty()) {
            throw new IllegalArgumentException("SQL query cannot be null or empty");
        }

        if (values == null || values.isEmpty()) {
            throw new IllegalArgumentException("Values cannot be null or empty");
        }

        return trinoService.deleteData(sql, values.toArray());
    }
}
