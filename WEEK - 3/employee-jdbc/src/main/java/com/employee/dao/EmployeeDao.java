package com.employee.dao;

import com.employee.model.Employee;

public interface EmployeeDao {
    Employee createEmployee(Employee emp);
    Employee getEmployeeById(int id);

}
