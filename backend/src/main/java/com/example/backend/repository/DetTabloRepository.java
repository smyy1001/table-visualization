package com.example.backend.repository;

import com.example.backend.model.DetTablo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetTabloRepository extends JpaRepository<DetTablo, Long> {
}