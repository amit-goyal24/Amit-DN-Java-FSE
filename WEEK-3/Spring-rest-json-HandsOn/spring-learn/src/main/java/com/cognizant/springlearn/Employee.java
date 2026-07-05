package com.cognizant.springlearn;

public class Employee {
    private int id;
    private String name;
    private Department department;
    private Skill skill;

    public Employee() {
    }

    // Getters and Setters generate kar le
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
}