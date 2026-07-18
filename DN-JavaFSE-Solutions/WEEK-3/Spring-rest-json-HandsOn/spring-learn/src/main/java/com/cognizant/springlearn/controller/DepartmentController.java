package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.Department;
import com.cognizant.springlearn.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

@RestController
public class DepartmentController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentController.class);

    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/departments")
    public ArrayList<Department> getAllDepartments() {
        LOGGER.info("START - DepartmentController.getAllDepartments");
        ArrayList<Department> departments = departmentService.getAllDepartments();
        LOGGER.info("END - DepartmentController.getAllDepartments");
        return departments;
    }
}