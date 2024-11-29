package com.example.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class TrinoRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TrinoRepository(@Qualifier("trinoDataSource") DataSource trinoDataSource) {
        this.jdbcTemplate = new JdbcTemplate(trinoDataSource);
    }

    public List<Map<String, Object>> executeQuery(String query) {
        return jdbcTemplate.queryForList(query);
    }
}
