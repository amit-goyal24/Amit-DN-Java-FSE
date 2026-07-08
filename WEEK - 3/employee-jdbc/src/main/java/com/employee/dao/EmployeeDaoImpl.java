package com.employee.dao;

import com.employee.dbUtil.DBConection;
import com.employee.model.Employee;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class EmployeeDaoImpl implements EmployeeDao{

    @Override
    public Employee createEmployee(Employee emp) {
        String q = "INSERT INTO employee (name , email) values(? ,?)";

        try(Connection con = DBConection.getConnection()){

            PreparedStatement ps = con.prepareStatement(q);
            ps.setString(1, emp.getName());

            ps.setString(2, emp.getEmail());

            int n = ps.executeUpdate();
        if(n>0) return emp;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }


        return null;
    }

    @Override
    public Employee getEmployeeById(int id) {
        Employee employee = new Employee();


         String q = "select * from employee where id = ?";
         try(Connection con = DBConection.getConnection()){
             PreparedStatement ps = con.prepareStatement(q);
             ps.setInt(1, id);


             ResultSet rs = ps.executeQuery();

                if(rs.next()){
                    String name = rs.getString("name");
                    String email = rs.getString("email");
                    employee.setName(name);
                    employee.setEmail(email);
                }

         }catch (Exception e){
             throw new RuntimeException(e);
         }

        return employee;
    }
}
