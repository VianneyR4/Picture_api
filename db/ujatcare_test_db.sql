-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 25, 2021 at 09:54 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ujatcare_test_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Images`
--

CREATE TABLE `Images` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Images`
--

INSERT INTO `Images` (`id`, `userId`, `title`, `description`, `image`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Image title for test', 'The controller exports updateAnUserImage. updateAnUserImage is an asynchronous function that takes two parameters: request and response. This function checks if there is an _id in the params in request body. if yes then replace all the front slashes to the back slashes in the path string and then update the value of the ProfilePicture to the constant path. In simple words, it means to update the file link in the database', '/Users/vianney.rwicha/Documents/Work/Ujat Care/UjatCare_test/static/uploads/8wRb12xIdZVsc2rTTm1t4gpU2rTCkVlo.jpg', 1, '2021-09-25 20:35:00', '2021-09-25 20:35:00'),
(2, 1, 'Background image', 'The controller exports updateAnUserImage. updateAnUserImage is an asynchronous function that takes two parameters: request and response. This function checks if there is an _id in the params in request body. if yes then replace all the front slashes to the back slashes in the path string and then update the value of the ProfilePicture to the constant path. In simple words, it means to update the file link in the database.', '/Users/vianney.rwicha/Documents/Work/Ujat Care/UjatCare_test/static/uploads/DC4sozq3q5dVMq2luSvvhIDpqX4G2MZi.jpg', 1, '2021-09-25 20:36:34', '2021-09-25 20:36:34'),
(3, 2, 'Background image', 'The controller exports updateAnUserImage. updateAnUserImage is an asynchronous function that takes two parameters: request and response. This function checks if there is an _id in the params in request body. if yes then replace all the front slashes to the back slashes in the path string and then update the value of the ProfilePicture to the constant path. In simple words, it means to update the file link in the database', '/Users/vianney.rwicha/Documents/Work/Ujat Care/UjatCare_test/static/uploads/GPInOVpusayAhz2850o5mGN5G3glFYRq.jpg', 1, '2021-09-25 21:04:36', '2021-09-25 21:04:36');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20210922204457-create-users.js'),
('20210922205025-create-images.js'),
('20210925085044-modify_images.js'),
('20210925091227-create-images.js'),
('20210925120949-create-images.js'),
('20210925131135-create-my-files.js'),
('20210925132406-create-my-files.js'),
('20210925132538-create-my-files.js'),
('20210925132656-create-my-files.js'),
('20210925132927-create-images.js'),
('20210925133940-create-images.js');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `email`, `first_name`, `last_name`, `password`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'vrwicha@ujatcare.com', 'Vianney', 'Rwicha', '$2b$05$L.oPVgxlAsiymMJ0S1vcuuvH7/po/WfQwbObkYihAGC4Wtpixgo4G', 1, '2021-09-24 19:55:12', '2021-09-24 19:55:12'),
(2, 'magali@ujatcare.com', 'Magali', 'Magali', '$2b$05$2CuBvurKoHome9dBKnjNC.rBoRpTxv1rhkhITYgLoCFTZz6dx622m', 1, '2021-09-24 23:10:46', '2021-09-24 23:10:46'),
(3, 'josue@ujatcare.com', 'Josue', 'Ushindi', '$2b$05$PQxoQrbZaISOeYEvNmaPJuyBFamNJXaJCKVvVlrmOAGvHNme7vL3.', 1, '2021-09-25 13:01:22', '2021-09-25 13:01:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Images`
--
ALTER TABLE `Images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Images`
--
ALTER TABLE `Images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
