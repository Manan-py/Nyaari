CREATE DATABASE IF NOT EXISTS nyaari_db;
USE nyaari_db;

CREATE TABLE IF NOT EXISTS problems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age INT NOT NULL,
    problem TEXT NOT NULL,
    symptoms TEXT,
    duration VARCHAR(255),
    email VARCHAR(255),
    timestamp DATETIME NOT NULL,
    status ENUM('pending', 'reviewed', 'in_progress', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 