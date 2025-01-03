package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "ANATABLO")
public class AnaTablo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Float id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "RECORDDATE", nullable = true)
    private Date recordDate;

    // Getters and Setters
    public Float getId() {
        return id;
    }

    public void setId(Float id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }
}
