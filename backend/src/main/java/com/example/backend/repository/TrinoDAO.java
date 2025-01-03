package com.example.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class TrinoDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TrinoDAO(@Qualifier("trinoDataSource") DataSource trinoDataSource) {
        this.jdbcTemplate = new JdbcTemplate(trinoDataSource);
    }

    public List<Map<String, Object>> fetchData(String query) {
        return jdbcTemplate.queryForList(query);
    }

    public int executeUpdate(String query, Object[] params) {
        return jdbcTemplate.update(query, params);
    }

    // public int executeInsert(String query, Object[] params) {
    //     return jdbcTemplate.update(query, params);
    // }


    public int executeInsert(String query, Object[] params) {
        try (Connection connection = jdbcTemplate.getDataSource().getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            for (int i = 0; i < params.length; i++) {
                Object param = params[i];

                // Convert second parameter (recordDate) to Timestamp if it's a String
                if (i == 1 && param instanceof String) {
                    preparedStatement.setTimestamp(i + 1, java.sql.Timestamp.valueOf(
                            ((String) param).replace("T", " ").substring(0, 19)));
                } else {
                    preparedStatement.setObject(i + 1, param);
                }
            }

            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error executing insert query", e);
        }
    }
    

    public int executeDelete(String query, Object[] params) {
        return jdbcTemplate.update(query, params);
    }
}
