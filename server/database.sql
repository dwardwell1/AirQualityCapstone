DROP DATABASE IF EXISTS  air_quality;

CREATE DATABASE  air_quality;

CREATE TABLE users (
  id SERIAL PRIMARY KEY ,
  username varchar(25) UNIQUE NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  password  varchar(50) NOT NULL
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY ,
  zipCode int,
  city varchar(50),
  stateCode varchar(5),
  lat DECIMAL(10,8) NOT NULL,
  lng DECIMAL(11,8) NOT NULL
);

CREATE TABLE subscriptions (
  user_id int NOT NULL REFERENCES users (id),
  location_id int NOT NULL REFERENCES locations (id),
  defaultLocale boolean,
  emailAlerts int
);

INSERT INTO users
  (username, email, password)
VALUES
  ('dwardwell',  'dwardwell1@gmail.com', 'password');

INSERT INTO locations
  (zipCode, city, stateCode, lat, lng)
  VALUES 
  ('95926', 'Chico', 'CA', '39.7289', '-121.837');

  INSERT INTO subscriptions
    (user_id, location_id, defaultLocale, emailAlerts)
    VALUES
    (1, 1, true, 1);