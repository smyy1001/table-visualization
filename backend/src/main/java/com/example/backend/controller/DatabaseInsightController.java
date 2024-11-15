package com.example.backend.controller;

import com.example.backend.repository.AnaTabloRepository;
import com.example.backend.repository.DetTabloRepository;
import com.example.backend.model.AnaTablo;
import com.example.backend.model.DetTablo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Date;


@RestController
@RequestMapping("/api")
public class DatabaseInsightController {

    @Autowired
    private AnaTabloRepository anaTabloRepository;

    @Autowired
    private DetTabloRepository detayTabloRepository;

    @GetMapping("/ana-count")
    public String anaTabloCount() {
        long count = anaTabloRepository.count();
        return "Total records in anaTablo: " + count;
    }

    @GetMapping("/detay-count")
    public String detayTabloCount() {
        long count = detayTabloRepository.count();
        return "Total records in detayTablo1: " + count;
    }

    @GetMapping("/ana")
    public List<AnaTablo> getAnaTabloRecords() {
        return anaTabloRepository.findAll();
    }

    @GetMapping("/detay")
    public List<DetTablo> getDetayTablo1Records() {
        return detayTabloRepository.findAll();
    }

    @PostMapping("/ana/insert")
    public AnaTablo insertRecord(@RequestBody AnaTablo newRecord) {
        if (newRecord.getRecordDate() == null) {
            newRecord.setRecordDate(new Date());
        }
        return anaTabloRepository.save(newRecord);
    }

    @PostMapping("/detay/insert")
    public DetTablo insertDetTablo(@RequestBody DetTablo newRecord) {
        if (newRecord.getName() == null) {
            throw new IllegalArgumentException("Name cannot be null");
        }
        return detayTabloRepository.save(newRecord);
    }
}
