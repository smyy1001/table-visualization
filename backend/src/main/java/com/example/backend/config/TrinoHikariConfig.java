package com.example.backend.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class TrinoHikariConfig {

    @Value("${spring.datasource.trino.url}")
    private String url;

    @Value("${spring.datasource.trino.username}")
    private String username;

    @Value("${spring.datasource.trino.password}")
    private String password;

    @Bean(name = "trinoDataSource")
    public DataSource hikariTrinoDataSource() {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl(url);
        hikariConfig.setUsername(username);
        hikariConfig.setPassword(password);
        hikariConfig.setDriverClassName("io.trino.jdbc.TrinoDriver");

        // Hikari-specific settings
        hikariConfig.setAutoCommit(true);
        hikariConfig.setMaximumPoolSize(10);
        hikariConfig.setMinimumIdle(2);
        hikariConfig.setIdleTimeout(30000);
        hikariConfig.setConnectionTimeout(30000);

        return new HikariDataSource(hikariConfig);
    }
}
