package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DETTABLO")
public class DetTablo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Float id;

    @Column(name = "NAME", nullable = false)
    private Float name;

    // Getters and Setters
    public Float getId() {
        return id;
    }

    public void setId(Float id) {
        this.id = id;
    }

    public Float getName() {
        return name;
    }

    public void setName(Float name) {
        this.name = name;
    }
}
