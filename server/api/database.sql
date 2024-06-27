CREATE DATABASE bitesize;

CREATE TABLE bite(
    bite_id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    summary VARCHAR(1000)
);