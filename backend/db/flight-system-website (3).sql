-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 19, 2024 at 09:20 PM
-- Server version: 8.0.31
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flight-system-website`
--

-- --------------------------------------------------------

--
-- Table structure for table `airlines`
--

DROP TABLE IF EXISTS `airlines`;
CREATE TABLE IF NOT EXISTS `airlines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `headquarters` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airlines`
--

INSERT INTO `airlines` (`id`, `name`, `country`, `headquarters`, `website`) VALUES
(1, 'Middle East Airlines', 'Lebanon', 'Beirut, Lebanon', 'https://www.mea.com.lb'),
(2, 'Turkish Airlines', 'Turkey', 'Istanbul, Turkey', 'https://www.turkishairlines.com'),
(3, 'Qatar Airways', 'Qatar', 'Doha, Qatar', 'https://www.qatarairways.com');

-- --------------------------------------------------------

--
-- Table structure for table `airplanes`
--

DROP TABLE IF EXISTS `airplanes`;
CREATE TABLE IF NOT EXISTS `airplanes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_id` int NOT NULL,
  `airline_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `airplanes`
--

INSERT INTO `airplanes` (`id`, `model_id`, `airline_id`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 2, 1),
(4, 3, 2),
(5, 2, 2),
(6, 3, 1),
(7, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `airplane_models`
--

DROP TABLE IF EXISTS `airplane_models`;
CREATE TABLE IF NOT EXISTS `airplane_models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `airplane_models`
--

INSERT INTO `airplane_models` (`id`, `name`, `capacity`) VALUES
(1, 'Airbus', 100),
(2, 'Bombardier', 50),
(3, 'Embraer', 50);

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
CREATE TABLE IF NOT EXISTS `airports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(3) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airports`
--

INSERT INTO `airports` (`id`, `name`, `city`, `country`, `code`) VALUES
(1, 'Beirut-Rafic Hariri International Airport', 'Beirut', 'Lebanon', 'BEY'),
(2, 'Hamad International Airport', 'Doha', 'Qatar', 'DOH'),
(3, 'Istanbul Airport', 'Istanbul', 'Turkey', 'IST');

-- --------------------------------------------------------

--
-- Table structure for table `emergency-contacts`
--

DROP TABLE IF EXISTS `emergency-contacts`;
CREATE TABLE IF NOT EXISTS `emergency-contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `relation` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
CREATE TABLE IF NOT EXISTS `flights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `departure_airport_id` int NOT NULL,
  `arrival_airport_id` int NOT NULL,
  `departure_date` date NOT NULL,
  `departure_time` time NOT NULL,
  `arrival_date` date NOT NULL,
  `arrival_time` time NOT NULL,
  `airplane_id` int NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `price`, `departure_airport_id`, `arrival_airport_id`, `departure_date`, `departure_time`, `arrival_date`, `arrival_time`, `airplane_id`, `status`) VALUES
(1, 1000, 1, 2, '2024-03-05', '01:00:00', '2024-03-06', '15:00:00', 2, 'Pending'),
(2, 1000, 1, 2, '2024-03-05', '01:00:00', '2024-03-06', '15:00:00', 4, 'Pending'),
(3, 1000, 1, 2, '2024-03-05', '01:00:00', '2024-03-06', '15:00:00', 3, 'Pending'),
(4, 1000, 1, 2, '2024-03-05', '01:00:00', '2024-03-06', '15:00:00', 2, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `flight_review`
--

DROP TABLE IF EXISTS `flight_review`;
CREATE TABLE IF NOT EXISTS `flight_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `review` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `flight_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flight_review`
--

INSERT INTO `flight_review` (`id`, `rating`, `review`, `user_id`, `flight_id`) VALUES
(1, 1, 'gfdgfdgdgvfdg', 6, 1),
(2, 1, 'gfdgfdgdgvfdg', 6, 1),
(3, 2, 'gfdgfdgdgvfdg', 6, 1),
(4, 3, 'gfdgfdgdgvfdg', 6, 1),
(5, 3, 'gfdgfdgdgvfdg', 6, 2),
(6, 3, 'gfdgfdgdgvfdg', 6, 1),
(7, 3, 'gfdgfdgdgvfdg', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment_request`
--

DROP TABLE IF EXISTS `payment_request`;
CREATE TABLE IF NOT EXISTS `payment_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_request`
--

INSERT INTO `payment_request` (`id`, `user_id`, `amount`, `status`) VALUES
(1, 6, 1000, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `flight_id` int NOT NULL,
  `user_id` int NOT NULL,
  `seat_number` int NOT NULL,
  `status` varchar(40) NOT NULL DEFAULT 'Confirmed',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `flight_id`, `user_id`, `seat_number`, `status`) VALUES
(8, 1, 6, 7, 'Confirmed'),
(7, 1, 6, 6, 'Confirmed'),
(6, 1, 6, 5, 'Confirmed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` varchar(50) NOT NULL DEFAULT 'inactive',
  `dob` date DEFAULT NULL,
  `nationality` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `passport_number` int DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `coins` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `is_active`, `dob`, `nationality`, `passport_number`, `phone_number`, `coins`) VALUES
(6, 'Mahdi', '123@123', '$2y$10$q1WXlMTP8KnteeQ3AhkUMuZtKw8x66uL6ladQx1FZ8il4Ip2GdKEi', 'active', NULL, NULL, NULL, NULL, 4000);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
