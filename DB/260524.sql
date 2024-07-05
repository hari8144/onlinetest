-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.35 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for testifly
CREATE DATABASE IF NOT EXISTS `testifly` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `testifly`;

-- Dumping structure for table testifly.category
CREATE TABLE IF NOT EXISTS `category` (
  `categoryid` int NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(100) NOT NULL DEFAULT '0',
  `categoryrelatedto` int NOT NULL DEFAULT (0),
  `status` tinyint NOT NULL DEFAULT (0),
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.category: ~14 rows (approximately)
INSERT INTO `category` (`categoryid`, `categoryname`, `categoryrelatedto`, `status`) VALUES
	(1, 'NEET', 0, 1),
	(2, 'JEE', 0, 1),
	(3, 'NAT', 1, 1),
	(4, 'TAMIL', 9, 1),
	(5, 'ENGLISH', 9, 1),
	(6, 'MATHS', 9, 1),
	(7, 'SCIENCE', 9, 1),
	(8, 'COMPUTER', 9, 1),
	(9, '12TH', 0, 1),
	(10, 'COMPUTER', 15, 1),
	(11, 'SCIENCE', 15, 1),
	(12, 'MATHS', 15, 1),
	(13, 'ENGLISH', 15, 1),
	(14, 'TAMIL', 15, 1),
	(15, '11TH', 0, 1),
	(16, 'MATHS', 2, 0);

-- Dumping structure for table testifly.logindetail
CREATE TABLE IF NOT EXISTS `logindetail` (
  `logindetailid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL DEFAULT '0',
  `username` varchar(250) NOT NULL DEFAULT '0',
  `logindatetime` datetime DEFAULT NULL,
  `usertype` varchar(50) DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT (0),
  PRIMARY KEY (`logindetailid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.logindetail: ~2 rows (approximately)
INSERT INTO `logindetail` (`logindetailid`, `userid`, `username`, `logindatetime`, `usertype`, `status`) VALUES
	(1, 1, 'admin', '2024-02-01 22:08:46', 'Customer', 1),
	(2, 2, 'muthu', '2024-02-01 22:09:04', 'Admin', 1);

-- Dumping structure for table testifly.otpstore
CREATE TABLE IF NOT EXISTS `otpstore` (
  `otpstoreid` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `otpno` varchar(50) DEFAULT NULL,
  `otpctime` datetime DEFAULT NULL,
  `otpetime` datetime DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  PRIMARY KEY (`otpstoreid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.otpstore: ~2 rows (approximately)
INSERT INTO `otpstore` (`otpstoreid`, `userid`, `email`, `otpno`, `otpctime`, `otpetime`, `status`) VALUES
	(1, 1, 'admin@stashook.com', NULL, NULL, NULL, 1),
	(2, 2, 'muthu@stashook.com', '561730', '2024-02-02 14:37:39', '2024-02-02 14:47:39', 1),
	(3, 3, 'muthuslm2006@gmail.com', '653153', '2024-05-22 11:37:03', '2024-05-22 11:47:03', 1);

-- Dumping structure for table testifly.result
CREATE TABLE IF NOT EXISTS `result` (
  `resultid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL DEFAULT '0',
  `totalquestions` int NOT NULL DEFAULT '0',
  `totalcorrectans` int NOT NULL DEFAULT '0',
  `createdate` datetime NOT NULL DEFAULT (now()),
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Category',
  PRIMARY KEY (`resultid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.result: ~2 rows (approximately)
INSERT INTO `result` (`resultid`, `userid`, `totalquestions`, `totalcorrectans`, `createdate`, `category`) VALUES
	(1, 1, 5, 4, '2024-05-25 21:03:04', 'NEET'),
	(2, 3, 5, 4, '2024-05-26 19:09:59', 'JEE'),
	(3, 4, 5, 4, '2024-05-26 19:18:29', 'NEET');

-- Dumping structure for table testifly.role
CREATE TABLE IF NOT EXISTS `role` (
  `roleid` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `shortname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`roleid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.role: ~2 rows (approximately)
INSERT INTO `role` (`roleid`, `rolename`, `shortname`, `status`) VALUES
	(1, 'Customer', 'Cu', 1),
	(2, 'Admin', 'Ad', 1);

-- Dumping structure for table testifly.selfguru
CREATE TABLE IF NOT EXISTS `selfguru` (
  `sgid` int NOT NULL AUTO_INCREMENT,
  `questionname` varchar(250) NOT NULL DEFAULT '0',
  `option1` varchar(100) NOT NULL DEFAULT '0',
  `option2` varchar(100) NOT NULL DEFAULT '0',
  `option3` varchar(100) NOT NULL DEFAULT '0',
  `option4` varchar(100) NOT NULL DEFAULT '0',
  `correctans` int NOT NULL DEFAULT (0),
  `status` tinyint NOT NULL DEFAULT (0),
  `catagory` int DEFAULT NULL,
  PRIMARY KEY (`sgid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.selfguru: ~20 rows (approximately)
INSERT INTO `selfguru` (`sgid`, `questionname`, `option1`, `option2`, `option3`, `option4`, `correctans`, `status`, `catagory`) VALUES
	(1, 'What is this capital of India?', 'Chennai', 'Delhi', 'Kolkata', 'Mumbai', 2, 1, NULL),
	(2, 'What is this capital of Tamilnadu?', 'Chennai', 'Salem', 'Namakkal', 'Covai', 1, 1, NULL),
	(3, '\r\nWhich is the capital of Goa?', 'Assom', 'Kolkata', 'New Delhi', 'Panaji', 4, 1, NULL),
	(4, 'What is the capital of Kerala?', 'Salem', 'Tiruvanantapuram', 'New Delhi', 'Nainital', 2, 1, NULL),
	(5, 'National Flower of India', 'Lilly', 'Lotus', 'Maligai', 'cherry', 2, 1, NULL),
	(6, 'Guess the capital city of Maharashtra', 'Chennai', 'Kolkata', 'New Delhi', 'Mumbai', 4, 1, NULL),
	(7, 'This is the capital city of the picturesque state of Uttarakhand', 'Dehradun', 'Shimla', 'Nainital', 'Ooty', 1, 1, NULL),
	(8, 'The capital city of this northeastern state is Dispur', 'Meghalaya', 'Assom', 'Tripura', 'Mizoram', 2, 1, NULL),
	(9, 'This union territory has Kavaratti as its capital', 'Chandigarh', 'Daman & Diu', 'Dadra & Nagar Haveli', 'Lakshadweep', 4, 1, NULL),
	(10, 'Guess are the capital of Andaman & Nicobar Islands', 'Pondicherry', 'Port Blair', 'Daman', 'None of the above', 2, 1, NULL),
	(11, 'Which of the following cities is the capital of Arunachal Pradesh?', 'Raipur', 'Panaji', 'Itanagar', 'Bhopal', 3, 1, NULL),
	(12, 'Odisha’s capital is?', 'Bhubaneshwar', 'Puri', 'Cuttack', 'Calcutta', 1, 1, NULL),
	(13, 'Which of these is the capital of the state of Uttar Pradesh?', 'Lucknow', 'Prayagraj', 'Kanpur', 'Indore', 1, 1, NULL),
	(14, 'This city is the capital of the northeastern state of Meghalaya', 'Aizawl', 'Agartala', 'Kohima', 'Shillong', 4, 1, NULL),
	(15, 'Guess is the capital of the western state of Gujarat', 'Ahmedabad', 'Gandhinagar', 'Surat', 'Rajkot', 2, 1, NULL),
	(16, 'Which of these states has Gangtok as its capital?', 'Nagaland', 'Tripura', 'Mizoram', 'Sikkim', 4, 1, NULL),
	(17, 'What is the capital of Karnataka?', 'Coorg', 'Bengaluru', 'Mangaluru', 'Mysuru', 2, 1, NULL),
	(18, 'This city is the capital of the hilly state of Himachal Pradesh', 'Leh', 'Manali', 'Chandigarh', 'Shimla', 4, 1, NULL),
	(19, 'Guess the capital city of the northern state of Punjab', 'Jalandhar', 'Amritsar', 'Chandigarh', 'None of the above', 3, 1, NULL),
	(20, 'Which of these is not a union territory?', 'Chandigarh', 'Ladakh', 'Pondicherry', 'Panaji', 4, 1, NULL);

-- Dumping structure for table testifly.user
CREATE TABLE IF NOT EXISTS `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL DEFAULT '0',
  `phonenumber` varchar(50) NOT NULL DEFAULT '0',
  `address` varchar(50) NOT NULL DEFAULT '0',
  `area` varchar(50) NOT NULL DEFAULT '0',
  `pincode` varchar(50) NOT NULL DEFAULT '0',
  `username` varchar(50) NOT NULL DEFAULT '0',
  `password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `modifieddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createddate` timestamp NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.user: ~2 rows (approximately)
INSERT INTO `user` (`userid`, `name`, `email`, `phonenumber`, `address`, `area`, `pincode`, `username`, `password`, `modifieddate`, `createddate`, `status`) VALUES
	(1, 'Admin', 'admin@stashook.com', '9884080613', '41 A ', 's puram', '637015', 'admin', '$2a$08$XCwy7lsyjrQ9vzKbsykAWeLbfMS/uhK..KgHcUNXxyVnH1V1Ekvc2', '2024-02-01 16:29:51', '2024-02-01 16:29:51', 1),
	(2, 'muthu', 'muthu@stashook.com', '9003925059', '41 A ', 's puram', '637015', 'muthu', '$2a$08$IIVNGsotIODgJnkoZUDTveuI/IUmbzSdRZR22pkYFbmkmw7KxIGqG', '2024-02-01 16:34:07', '2024-02-01 16:34:07', 1),
	(3, 'varun', 'muthuslm2006@gmail.com', '9998882221', '11 A ', 'chennai', '600001', 'varun', '$2a$08$4sDxFSUJPmwxa/RhG8KhOePlahBD3SyI.13wmDRcw4/PZn9Cg4eDK', '2024-05-22 06:05:49', '2024-05-22 06:04:18', 1);

-- Dumping structure for table testifly.userrolemap
CREATE TABLE IF NOT EXISTS `userrolemap` (
  `userRoleMapId` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL DEFAULT '0',
  `roleid` int NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`userRoleMapId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testifly.userrolemap: ~2 rows (approximately)
INSERT INTO `userrolemap` (`userRoleMapId`, `userid`, `roleid`, `status`) VALUES
	(1, 1, 2, 1),
	(2, 2, 1, 1),
	(3, 3, 1, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
