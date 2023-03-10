# Cycle

- [Technologies](#technologies)
- [Requirements](#requirements)
- [Installation](#installation)

## Technologies

- Spring Boot
- MySQL
- Thymeleaf

## Requirements

- Java >= 18
- MySQL 8.0
- Maven 3.9.0

## Installation

1. Clone the repository

    ```sh
    git clone https://github.com/edvschvlz/cycle.git
    ```

2. Create the database using the model [Database](database/cycle_database_model.mwb)

3. Set the database connection in [Connect](src/main/java/com/example/cycle/db/Connect.java)


4. Install dependencies

    ```sh
    mvn clean package
    ```

5. Run the application

    ```sh
    mvn spring-boot:run
    ```

6. The application will be exposed on port `8080`
