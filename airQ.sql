CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `emailAlerts` boolean NOT NULL,
  `alertLevel` int
);

CREATE TABLE `locations` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `zipCode` int,
  `city` varchar(255),
  `stateCode` varchar(255),
  `lat` DECIMAL(10,8) NOT NULL,
  `lng` DECIMAL(11,8) NOT NULL
);

CREATE TABLE `userLocations` (
  `user_id` int NOT NULL,
  `location_id` int NOT NULL,
  `defaultLocale` boolean
);

ALTER TABLE `userLocations` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `userLocations` ADD FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);
