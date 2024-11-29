package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;

@Configuration
public class TrinoDataSourceConfig {

    @Value("${spring.datasource.trino.url}")
    private String url;

    @Value("${spring.datasource.trino.username}")
    private String username;

    @Value("${spring.datasource.trino.password}")
    private String password;

    @Bean(name = "trinoDataSource")
    public DataSource trinoDataSource() {
        return DataSourceBuilder.create()
                .url(url)
                .username(username)
                .password(password)
                .driverClassName("io.trino.jdbc.TrinoDriver")
                .build();
    }
}
