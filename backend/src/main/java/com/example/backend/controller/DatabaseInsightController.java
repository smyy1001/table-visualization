
// package com.example.backend.controller;

// import com.example.backend.repository.AnaTabloRepository;
// import com.example.backend.repository.DetayTablo1Repository;
// import com.example.backend.model.AnaTablo;
// import com.example.backend.model.DetayTablo;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.format.annotation.DateTimeFormat;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.List;
// import java.util.Date;

// @RestController
// @RequestMapping("/api")
// public class DatabaseInsightController {

//     @Autowired
//     private AnaTabloRepository anaTabloRepository;

//     @Autowired
//     private DetayTablo1Repository detayTablo1Repository;

//     @GetMapping("/ana-tablo-count")
//     public String anaTabloCount() {
//         long count = anaTabloRepository.count();
//         return "Total records in anaTablo: " + count;
//     }

//     @GetMapping("/detay-tablo1-count")
//     public String detayTablo1Count() {
//         long count = anaTabloRepository.count();
//         return "Total records in anaTablo: " + count;
//     }

//     @GetMapping("/ana-tablo")
//     public List<AnaTablo> getAnaTabloRecords() {
//         return anaTabloRepository.findAll();
//     }

//     @GetMapping("/detay-tablo1/all")
//     public List<DetayTablo> getDetayTablo1Records() {
//         return detayTablo1Repository.findAll();
//     }

//     // Query by String 'name'
//     @GetMapping("/detay-tablo1/name")
//     public List<DetayTablo> getDetayTablo1ByName(@RequestParam("field") int fieldValue) {
//         return detayTablo1Repository.findByName(fieldValue);
//     }

// }



package com.example.backend.controller;

import com.example.backend.repository.AnaTabloRepository;
import com.example.backend.model.AnaTablo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DatabaseInsightController {

    @Autowired
    private AnaTabloRepository anaTabloRepository;

    @Autowired
    private EntityManager entityManager;

    // Get the total count of records in AnaTablo
    @GetMapping("/ana-tablo-count")
    public String anaTabloCount() {
        long count = anaTabloRepository.count();
        return "Total records in anaTablo: " + count;
    }

    // Fetch all records from AnaTablo
    @GetMapping("/ana-tablo")
    public List<AnaTablo> getAnaTabloRecords() {
        return anaTabloRepository.findAll();
    }

    // Get the total count of records in a dynamic DetayTablo
    @GetMapping("/detay-tablo-count")
    public String getDetayTabloCount(@RequestParam("tableName") String tableName) {
        String sql = "SELECT COUNT(*) FROM " + tableName;
        Query query = entityManager.createNativeQuery(sql);
        long count = ((Number) query.getSingleResult()).longValue();
        return "Total records in " + tableName + ": " + count;
    }

    // Fetch all records from a dynamic DetayTablo
    @GetMapping("/detay-tablo/all")
    public List<Object[]> getDetayTabloRecords(String tableName) {
        String sql = "SELECT * FROM " + tableName;
        Query query = entityManager.createNativeQuery(sql);
        return query.getResultList();
    }

    // Query by 'name' in a dynamic DetayTablo table
    @GetMapping("/detay-tablo/tableName/fieldValue")
    public List<Object[]> getDetayTabloByName(@RequestParam("tableName") String tableName,
            @RequestParam("fieldValue") int fieldValue) {
        String sql = "SELECT * FROM " + tableName + " WHERE name = :name";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("name", fieldValue);
        return query.getResultList();
    }
}
