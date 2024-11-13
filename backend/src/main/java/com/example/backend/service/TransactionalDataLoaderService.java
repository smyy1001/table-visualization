// package com.example.backend.service;

// import com.example.backend.model.AnaTablo;
// import com.example.backend.repository.AnaTabloRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import jakarta.persistence.EntityManager;
// import jakarta.persistence.Query;
// import javax.json.JsonArray;
// import javax.json.JsonObject;
// import java.sql.Date;
// import java.time.LocalDate;

// @Service
// public class TransactionalDataLoaderService {

//     @Autowired
//     private AnaTabloRepository anaTabloRepository;

//     @Autowired
//     private EntityManager entityManager;

//     @Transactional
//     public void load(JsonArray tableDetails, String schema) {
//         for (JsonObject table : tableDetails.getValuesAs(JsonObject.class)) {
//             if (table.getString("tableType").equals("mainTable")) {
//                 AnaTablo anaTablo = new AnaTablo();

//                 for (JsonObject field : table.getJsonArray("fields").getValuesAs(JsonObject.class)) {
//                     if (field.getString("fieldName").equals("name")) {
//                         anaTablo.setName(field.getString("value"));
//                     }
//                     if (field.getString("fieldName").equals("recordDate")) {
//                         String dateString = field.getString("value");
//                         LocalDate parsedDate = LocalDate.parse(dateString);
//                         anaTablo.setRecordDate(Date.valueOf(parsedDate));
//                     }
//                 }
//                 // Save anaTablo record
//                 anaTabloRepository.save(anaTablo);
//             } else if (table.getString("tableType").equals("detailTable")) {
//                 String tableName = table.getString("tableName").toUpperCase();

//                 for (JsonObject field : table.getJsonArray("fields").getValuesAs(JsonObject.class)) {
//                     Integer nameValue = field.getInt("value");

//                     // Perform dynamic insertion into the detail table
//                     String sql = "INSERT INTO SYSTEM." + tableName + " (name) VALUES (?)";
//                     Query query = entityManager.createNativeQuery(sql);
//                     query.setParameter(1, nameValue);
//                     query.executeUpdate();
//                 }
//             }
//         }
//     }
// }
