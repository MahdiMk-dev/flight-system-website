-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 17, 2024 at 10:56 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

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
  `name` varchar(255) NOT NULL,
  `origin` varchar(255) NOT NULL,
  `rate` int NOT NULL,
  `review` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `airplane-models`
--

DROP TABLE IF EXISTS `airplane-models`;
CREATE TABLE IF NOT EXISTS `airplane-models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
CREATE TABLE IF NOT EXISTS `airports` (
  `id` int NOT NULL,
  `origin` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `price`, `departure_airport_id`, `arrival_airport_id`, `departure_date`, `departure_time`, `arrival_date`, `arrival_time`, `airplane_id`) VALUES
(1, 1000, 1, 2, '0000-00-00', '01:00:00', '0000-00-00', '15:00:00', 2);

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `dob` date NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `passport_number` int NOT NULL,
  `phone_number` int NOT NULL,
  `coins` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `dob`, `nationality`, `passport_number`, `phone_number`, `coins`) VALUES
(1, 'test12', 'test@gmail.com', '$2y$10$TOsMor7coAAKVbgKiEwgJ.42HQVfEhsKkrkU8XPx.Yfg66d9lfs0W', '0000-00-00', '', 0, 0, 0),
(2, 'mahdi', 'mokaledmahdi@gmail.com', '$2y$10$G565Tz/gvek0cfkcaSB8Y.KTGeB3TzbWVUbRulmLSCCXYsNHzlCge', '0000-00-00', '', 0, 0, 0),
(3, 'mahdi', 'mahdi@gmail.com', '$2y$10$AxqucklYuyTrrmRWRS1DV.Bo2o8Srvy5rzC9XGMcnreWV8ExbbGeG', '0000-00-00', '', 0, 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
