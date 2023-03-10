package com.example.cycle.db;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.context.annotation.Configuration;

@Configuration
public class Connect {
    private Connection connection;

    public Connection openConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/cycle?"
                    + "user=cycle&password=cycle&useTimezone=true&serverTimezone=UTC");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return connection;
    }

    public void closeConnection() {
        try {
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
