package com.employee;


import com.employee.dao.EmployeeDao;
import com.employee.dao.EmployeeDaoImpl;
import com.employee.model.Employee;

import java.sql.SQLException;

/**
 * Hello world!
 *
 */
public class App {
    public static void main(String[] args) throws SQLException {
        Employee e1 = new Employee();
        e1.setName("Amit");
        e1.setEmail("Amitpvt0150@gmail.com");

        Employee e2 = new Employee();
        e1.setName("rahul");
        e1.setEmail("rahul123@gmail.com");


        EmployeeDao employeeDao = new EmployeeDaoImpl();
        employeeDao.createEmployee(e1);

        Employee e =employeeDao.getEmployeeById(1);
        System.out.println(e);
    }
}
