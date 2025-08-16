-- Drop the table if it already exists to ensure a clean slate on each restart.
DROP TABLE IF EXISTS users;

-- Create the users table.
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);