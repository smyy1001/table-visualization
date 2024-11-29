package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.backend.repository.TrinoRepository;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrinoService {

    @Autowired
    private TrinoRepository trinoRepository;

    @Autowired
    private DataSource dataSource;

    public List<Map<String, Object>> fetchTrinoData(String sql) {
        return trinoRepository.executeQuery(sql);
    }

    public List<Map<String, Object>> executeParameterizedQuery(String sql, List<Object> values) {
        try (Connection connection = dataSource.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            for (int i = 0; i < values.size(); i++) {
                preparedStatement.setObject(i + 1, values.get(i));
            }

            ResultSet resultSet = preparedStatement.executeQuery();
            List<Map<String, Object>> result = new ArrayList<>();

            while (resultSet.next()) {
                Map<String, Object> row = new HashMap<>();
                ResultSetMetaData metaData = resultSet.getMetaData();
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    row.put(metaData.getColumnName(i), resultSet.getObject(i));
                }
                result.add(row);
            }
            return result;

        } catch (SQLException e) {
            throw new RuntimeException("Error executing query", e);
        }
    }

    public int executeUpdateQuery(String sql, List<Object> values) {
        try (Connection connection = dataSource.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            for (int i = 0; i < values.size(); i++) {
                Object value = values.get(i);
                if (value instanceof String && i == 1) {
                    preparedStatement.setTimestamp(i + 1,
                            java.sql.Timestamp.valueOf(value.toString().replace("T", " ").substring(0, 19)));
                } else {
                    preparedStatement.setObject(i + 1, value);
                }
            }

            return preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Error executing update query", e);
        }
    }
}
