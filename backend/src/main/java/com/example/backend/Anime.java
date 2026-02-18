package com.example.backend;

import java.util.List;

public class Anime {
    private String id;
    private String name;
    private List<String> pictures; // URLs to the 5 pictures stored in Firebase Storage

    // Constructor
    public Anime() {
    }

    public Anime(String id, String name, List<String> pictures) {
        this.id = id;
        this.name = name;
        this.pictures = pictures;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getPictures() {
        return pictures;
    }

    public void setPictures(List<String> pictures) {
        this.pictures = pictures;
    }
}

