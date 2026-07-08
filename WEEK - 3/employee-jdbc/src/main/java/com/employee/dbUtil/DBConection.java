package com.employee.dbUtil;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConection {

    private static final String url = "jdbc:mysql://localhost:3306/companydb";
    private final static String username = "root";
    private final static String password = "Amit@1234";

    private void DBConnection(){}

private static Connection connection = null;
    public static Connection getConnection() throws SQLException{
    if (connection == null) {
        connection = DriverManager.getConnection(url, username, password);
    }
    return connection;
    }
}
