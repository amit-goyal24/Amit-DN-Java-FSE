package com.cognizant.springlearn;

public class Skill {

    private int id;
    private String name;

    public Skill() {
        // Default constructor Spring ke liye zaroori hai
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Skill [id=" + id + ", name=" + name + "]";
    }



}