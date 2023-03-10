package com.example.cycle.product.repository;

import org.springframework.stereotype.Repository;

import com.example.cycle.db.Connect;
import com.example.cycle.product.model.Product;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import java.util.ArrayList;

@Repository
public class ProductRepository {
    private Connect connect;

    public ProductRepository(Connect connect) {
        this.connect = connect;
    }

    public void save(Product product) throws Exception {
        try (Connection connection = connect.openConnection()) {
            String comando = "insert into products (name, description, price) values (?, ?, ?)";

            PreparedStatement statement = connection.prepareStatement(comando);
            statement.setString(1, product.getName());
            statement.setString(2, product.getDescription());
            statement.setDouble(3, product.getPrice());
            statement.executeUpdate();

            connect.closeConnection();
        }
    }

    public List<Product> getAll() throws Exception {
        try (Connection connection = connect.openConnection()) {
            String comando = "select * from products";
            PreparedStatement statement = connection.prepareStatement(comando);
            ResultSet products = statement.executeQuery();

            List<Product> listProducts = new ArrayList<>();
            while (products.next()) {
                listProducts.add(new Product(products.getInt("id"), products.getString("name"),
                        products.getString("description"),
                        products.getDouble("price")));
            }

            connect.closeConnection();

            return listProducts;
        }
    }

    public List<Product> getByName(String name) throws Exception {
        try (Connection connection = connect.openConnection()) {
            String comando = "select * from products where name like ?";
            PreparedStatement statement = connection.prepareStatement(comando);
            statement.setString(1, '%' + name + '%');
            ResultSet products = statement.executeQuery();

            List<Product> listProducts = new ArrayList<>();
            while (products.next()) {
                listProducts.add(new Product(products.getInt("id"), products.getString("name"),
                        products.getString("description"), products.getDouble("price")));
            }

            connect.closeConnection();

            return listProducts;
        }
    }

    public Product getById(int id) throws Exception {
        try (Connection connection = connect.openConnection()) {
            String comando = "select * from products where id = ?";
            PreparedStatement statement = connection.prepareStatement(comando);
            statement.setInt(1, id);
            ResultSet resultProduct = statement.executeQuery();

            Product product = new Product();
            if (resultProduct.next()) {
                product.setId(id);
                product.setName(resultProduct.getString("name"));
                product.setDescription(resultProduct.getString("description"));
                product.setPrice(resultProduct.getDouble("price"));
            }

            return product;
        }
    }

    public void delete(int id) throws Exception {
        try (Connection connection = connect.openConnection()) {
            String comando = "delete from products where id = ?";
            PreparedStatement statement = connection.prepareStatement(comando);
            statement.setInt(1, id);
            statement.executeUpdate();
            connect.closeConnection();
        }
    }

    public void edit(Product product) throws Exception {
        try (Connection connection = connect.openConnection()) {
            String comando = "update products set name = ?, description = ?, price = ? where id = ?";
            PreparedStatement statement = connection.prepareStatement(comando);
            statement.setString(1, product.getName());
            statement.setString(2, product.getDescription());
            statement.setDouble(3, product.getPrice());
            statement.setInt(4, product.getId());
            statement.executeUpdate();
            connect.closeConnection();
        }
    }
}
