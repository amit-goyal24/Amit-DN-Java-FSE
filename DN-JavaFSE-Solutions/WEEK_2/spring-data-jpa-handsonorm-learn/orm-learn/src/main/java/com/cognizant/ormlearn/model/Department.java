package com.cognizant.ormlearn.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="department")
public class Department {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name="dp_id") private int id;
    @Column(name="dp_name") private String name;

    // Hands-on 5: One-To-Many relationship with EAGER fetch
    @OneToMany(mappedBy = "department", fetch = FetchType.EAGER)
    private Set<Employee> employeeList;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Set<Employee> getEmployeeList() { return employeeList; }
    public void setEmployeeList(Set<Employee> employeeList) { this.employeeList = employeeList; }

    @Override
    public String toString() { return "Department [id=" + id + ", name=" + name + "]"; }
}