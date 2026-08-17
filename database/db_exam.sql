-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2026 at 05:35 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'bbb', 'b@gmail.com', 'Examination', 'sfdddddji f fijf', '2026-08-12 03:02:26');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration_minutes` int(11) NOT NULL DEFAULT 10,
  `total_questions` int(11) NOT NULL DEFAULT 10,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `title`, `subject`, `duration_minutes`, `total_questions`, `description`, `is_active`, `created_at`) VALUES
(1, 'Computer Science Examination', 'Computer Science', 10, 10, 'Online Computer Science examination', 1, '2026-08-12 02:56:21'),
(2, 'Mathematics Examination', 'Mathematics', 10, 10, 'Online Mathematics examination', 1, '2026-08-12 02:56:21'),
(3, 'General Knowledge Examination', 'General Knowledge', 10, 10, 'Online General Knowledge examination', 1, '2026-08-12 02:56:21');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `rating`, `category`, `message`, `created_at`) VALUES
(1, 3, 5, 'Examination Experience', 'Excellent Experience', '2026-08-12 03:01:50');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `question_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_a` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_b` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_c` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_d` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct_option` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `exam_id`, `question_text`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_option`, `created_at`) VALUES
(31, 1, 'What does HTML stand for?', 'Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Machine Language', 'Home Tool Markup Language', 0, '2026-08-12 03:09:50'),
(32, 1, 'Which language is used to style web pages?', 'HTML', 'CSS', 'JavaScript', 'Python', 1, '2026-08-12 03:09:50'),
(33, 1, 'Which language adds interactivity to web pages?', 'HTML', 'CSS', 'JavaScript', 'SQL', 2, '2026-08-12 03:09:50'),
(34, 1, 'Which data structure uses FIFO?', 'Stack', 'Queue', 'Tree', 'Graph', 1, '2026-08-12 03:09:50'),
(35, 1, 'What does CPU stand for?', 'Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Computer Processing Utility', 0, '2026-08-12 03:09:50'),
(36, 1, 'Which symbol is commonly used for comments in JavaScript?', '//', '<!-- -->', '#', '**', 0, '2026-08-12 03:09:50'),
(37, 1, 'Which of these is a programming language?', 'HTTP', 'Python', 'HTML', 'CSS', 1, '2026-08-12 03:09:50'),
(38, 1, 'What does SQL primarily work with?', 'Images', 'Databases', 'Audio', 'Operating systems', 1, '2026-08-12 03:09:50'),
(39, 1, 'Which HTML tag creates a hyperlink?', '<link>', '<a>', '<href>', '<url>', 1, '2026-08-12 03:09:50'),
(40, 1, 'Which method converts JSON text into a JavaScript object?', 'JSON.parse()', 'JSON.convert()', 'JSON.object()', 'JSON.read()', 0, '2026-08-12 03:09:50'),
(41, 2, 'What is 12 × 8?', '86', '96', '108', '112', 1, '2026-08-12 03:09:50'),
(42, 2, 'What is the square root of 144?', '10', '11', '12', '14', 2, '2026-08-12 03:09:50'),
(43, 2, 'What is 25% of 200?', '25', '40', '50', '75', 2, '2026-08-12 03:09:50'),
(44, 2, 'What is 15 + 27?', '40', '42', '44', '45', 1, '2026-08-12 03:09:50'),
(45, 2, 'What is 100 ÷ 4?', '20', '25', '30', '40', 1, '2026-08-12 03:09:50'),
(46, 2, 'What is the value of 2⁵?', '10', '16', '25', '32', 3, '2026-08-12 03:09:50'),
(47, 2, 'A triangle has angles 60°, 60° and?', '30°', '45°', '60°', '90°', 2, '2026-08-12 03:09:50'),
(48, 2, 'What is 7 × 7?', '42', '49', '56', '63', 1, '2026-08-12 03:09:50'),
(49, 2, 'What is the perimeter of a square with side 5 cm?', '10 cm', '15 cm', '20 cm', '25 cm', 2, '2026-08-12 03:09:50'),
(50, 2, 'What is 0.5 expressed as a fraction?', '1/2', '1/3', '2/3', '3/4', 0, '2026-08-12 03:09:50'),
(51, 3, 'What is the capital of India?', 'Mumbai', 'New Delhi', 'Kolkata', 'Chennai', 1, '2026-08-12 03:09:50'),
(52, 3, 'Which planet is known as the Red Planet?', 'Earth', 'Venus', 'Mars', 'Jupiter', 2, '2026-08-12 03:09:50'),
(53, 3, 'How many days are there in a leap year?', '365', '366', '364', '360', 1, '2026-08-12 03:09:50'),
(54, 3, 'Which is the largest ocean?', 'Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean', 2, '2026-08-12 03:09:50'),
(55, 3, 'Which gas do humans need for respiration?', 'Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen', 1, '2026-08-12 03:09:50'),
(56, 3, 'How many continents are there?', '5', '6', '7', '8', 2, '2026-08-12 03:09:50'),
(57, 3, 'Which is the fastest land animal?', 'Lion', 'Tiger', 'Cheetah', 'Horse', 2, '2026-08-12 03:09:50'),
(58, 3, 'Which instrument measures temperature?', 'Barometer', 'Thermometer', 'Hygrometer', 'Speedometer', 1, '2026-08-12 03:09:50'),
(59, 3, 'How many colors are traditionally found in a rainbow?', '5', '6', '7', '8', 2, '2026-08-12 03:09:50'),
(60, 3, 'Which is the largest planet in our solar system?', 'Earth', 'Saturn', 'Jupiter', 'Neptune', 2, '2026-08-12 03:09:50');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `total_questions` int(11) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `started_at` datetime DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `user_id`, `exam_id`, `score`, `total_questions`, `percentage`, `started_at`, `submitted_at`) VALUES
(1, 1, 1, 7, 10, '70.00', '2026-08-12 08:26:48', '2026-08-12 02:57:37'),
(2, 1, 3, 8, 10, '80.00', '2026-08-12 08:28:02', '2026-08-12 02:58:56'),
(3, 3, 2, 10, 10, '100.00', '2026-08-12 08:29:45', '2026-08-12 03:01:17');

-- --------------------------------------------------------

--
-- Table structure for table `result_answers`
--

CREATE TABLE `result_answers` (
  `id` int(11) NOT NULL,
  `result_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `selected_option` tinyint(4) DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('student','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `student_id`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'aaa', 'STU000001', 'a@gmail.com', '$2a$10$gCVmM.Ke8zurFbdIUxtoQOpR7wZFemHxPj44/Lqvjrjw1kVRD5jKy', 'student', '2026-08-12 02:55:24'),
(2, 'Demo Student', 'STU1001', 'student@example.com', '$2a$10$ltjJcO0YSolh/OwyBb/CIeyOmm7gN/5l7lP9ppEgBBlxNQhP30g8i', 'student', '2026-08-12 02:56:21'),
(3, 'bbb', 'STU000003', 'b@gmail.com', '$2a$10$CYWbY4usCSTSgDKjhexWKumQBSlUg/E9F/hP2aLg31NfrtWahI..e', 'student', '2026-08-12 02:59:25'),
(4, 'System Administrator', 'ADMIN001', 'admin@example.com', '$2a$10$zRs76KsCdVc9Wnpt.vG/1O06VR6LBQESSHeoY3lp1UXKiYsO.mzYm', 'admin', '2026-08-12 03:09:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `result_answers`
--
ALTER TABLE `result_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `result_id` (`result_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `result_answers`
--
ALTER TABLE `result_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `result_answers`
--
ALTER TABLE `result_answers`
  ADD CONSTRAINT `result_answers_ibfk_1` FOREIGN KEY (`result_id`) REFERENCES `results` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `result_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
