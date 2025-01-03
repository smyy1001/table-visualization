package com.example.backend.service;

import com.example.backend.repository.TrinoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TrinoService {

    @Autowired
    private TrinoDAO trinoDAO;

    public List<Map<String, Object>> fetchData(String query) {
        return trinoDAO.fetchData(query);
    }

    public int updateData(String query, Object[] params) {
        return trinoDAO.executeUpdate(query, params);
    }

    public int insertData(String query, Object[] params) {
        return trinoDAO.executeInsert(query, params);
    }

    public int deleteData(String query, Object[] params) {
        return trinoDAO.executeDelete(query, params);
    }
}
