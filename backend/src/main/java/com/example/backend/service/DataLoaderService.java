// package com.example.backend.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import jakarta.annotation.PostConstruct;
// import javax.json.Json;
// import javax.json.JsonObject;
// import javax.json.JsonReader;
// import java.io.InputStream;

// @Service
// public class DataLoaderService {

//     @Autowired
//     private TransactionalDataLoaderService transactionalDataLoaderService;

//     @PostConstruct
//     public void loadData() {
//         try (InputStream is = getClass().getResourceAsStream("/config.json")) {
//             JsonReader reader = Json.createReader(is);
//             JsonObject jsonObject = reader.readObject();

//             transactionalDataLoaderService.load(jsonObject.getJsonArray("tableDetails"), jsonObject.getString("databaseUser"));
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }
// }
