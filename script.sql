-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2021 at 09:02 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bancoomevacuentasbd`
--
CREATE DATABASE IF NOT EXISTS `bancoomevacuentasbd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bancoomevacuentasbd`;

-- --------------------------------------------------------

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
CREATE TABLE `cuenta` (
  `id` int(11) NOT NULL,
  `numero` varchar(16) NOT NULL,
  `saldo` double NOT NULL,
  `fecha_hora_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `clave` varchar(255) NOT NULL,
  `estado_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cuenta`
--

INSERT INTO `cuenta` (`id`, `numero`, `saldo`, `fecha_hora_creacion`, `clave`, `estado_id`, `usuario_id`) VALUES(1, '2001', 200000, '2021-12-22 16:26:21', '$2b$10$TOfpjjteGyVRDN3.ORZtCO5ZFcjycyh94T5lGpGfwVtka382sfquK', 1, 1);
INSERT INTO `cuenta` (`id`, `numero`, `saldo`, `fecha_hora_creacion`, `clave`, `estado_id`, `usuario_id`) VALUES(2, '2002', 100000, '2021-12-22 19:01:51', '$2b$10$fosGHRKsh8X0ZZewg4C5e.cmBnl1IlS1m4EVAwwNUEEMqnHGqtuZC', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `estado_cuenta`
--

DROP TABLE IF EXISTS `estado_cuenta`;
CREATE TABLE `estado_cuenta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estado_cuenta`
--

INSERT INTO `estado_cuenta` (`id`, `nombre`) VALUES(1, 'Activa');
INSERT INTO `estado_cuenta` (`id`, `nombre`) VALUES(2, 'Inactiva');
INSERT INTO `estado_cuenta` (`id`, `nombre`) VALUES(3, 'Suspendida');
INSERT INTO `estado_cuenta` (`id`, `nombre`) VALUES(4, 'Bloqueada');
INSERT INTO `estado_cuenta` (`id`, `nombre`) VALUES(5, 'Revisión');
INSERT INTO `estado_cuenta` (`id`, `nombre`) VALUES(6, 'Otro');

-- --------------------------------------------------------

--
-- Table structure for table `estado_solicitud`
--

DROP TABLE IF EXISTS `estado_solicitud`;
CREATE TABLE `estado_solicitud` (
  `id` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estado_solicitud`
--

INSERT INTO `estado_solicitud` (`id`, `nombre`) VALUES(1, 'Aprobada');
INSERT INTO `estado_solicitud` (`id`, `nombre`) VALUES(2, 'No aprobada');
INSERT INTO `estado_solicitud` (`id`, `nombre`) VALUES(3, 'Pendiente');
INSERT INTO `estado_solicitud` (`id`, `nombre`) VALUES(4, 'Otra');

-- --------------------------------------------------------

--
-- Table structure for table `movimiento`
--

DROP TABLE IF EXISTS `movimiento`;
CREATE TABLE `movimiento` (
  `id` int(11) NOT NULL,
  `monto` double NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo_movimiento_id` int(11) NOT NULL,
  `cuenta_id` int(11) NOT NULL,
  `cuenta_id_destino` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movimiento`
--

INSERT INTO `movimiento` (`id`, `monto`, `fecha_hora`, `tipo_movimiento_id`, `cuenta_id`, `cuenta_id_destino`) VALUES(1, 1000, '2021-12-22 11:27:03', 1, 1, NULL);
INSERT INTO `movimiento` (`id`, `monto`, `fecha_hora`, `tipo_movimiento_id`, `cuenta_id`, `cuenta_id_destino`) VALUES(2, 2000, '2021-12-22 17:02:19', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reclamo`
--

DROP TABLE IF EXISTS `reclamo`;
CREATE TABLE `reclamo` (
  `id` int(11) NOT NULL,
  `observacion` varchar(255) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movimiento_id` int(11) NOT NULL,
  `respuesta_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reclamo`
--

INSERT INTO `reclamo` (`id`, `observacion`, `fecha_hora`, `movimiento_id`, `respuesta_id`, `usuario_id`) VALUES(1, 'Obs 1', '2021-12-22 11:30:33', 1, 3, 1);
INSERT INTO `reclamo` (`id`, `observacion`, `fecha_hora`, `movimiento_id`, `respuesta_id`, `usuario_id`) VALUES(2, 'Obs 2', '2021-12-22 16:31:41', 1, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
CREATE TABLE `respuesta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `respuesta`
--

INSERT INTO `respuesta` (`id`, `nombre`) VALUES(1, 'Satisfactoria');
INSERT INTO `respuesta` (`id`, `nombre`) VALUES(2, 'No satisfactoria');
INSERT INTO `respuesta` (`id`, `nombre`) VALUES(3, 'En proceso');
INSERT INTO `respuesta` (`id`, `nombre`) VALUES(4, 'Rechazada');
INSERT INTO `respuesta` (`id`, `nombre`) VALUES(5, 'Otra');

-- --------------------------------------------------------

--
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
CREATE TABLE `solicitud` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cuenta_id` int(11) NOT NULL,
  `estado_solicitud_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `solicitud`
--

INSERT INTO `solicitud` (`id`, `fecha`, `cuenta_id`, `estado_solicitud_id`, `usuario_id`) VALUES(1, '2021-12-22 14:23:28', 1, 1, 1);
INSERT INTO `solicitud` (`id`, `fecha`, `cuenta_id`, `estado_solicitud_id`, `usuario_id`) VALUES(2, '2021-12-22 14:23:28', 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
CREATE TABLE `tipo_documento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_documento`
--

INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES(1, 'Cédula');
INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES(2, 'Tarjeta identidad');
INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES(3, 'Cédula extranjería');
INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES(4, 'NIT');
INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES(5, 'Otro');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_movimiento`
--

DROP TABLE IF EXISTS `tipo_movimiento`;
CREATE TABLE `tipo_movimiento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_movimiento`
--

INSERT INTO `tipo_movimiento` (`id`, `nombre`) VALUES(1, 'Consignación');
INSERT INTO `tipo_movimiento` (`id`, `nombre`) VALUES(2, 'Retiro');
INSERT INTO `tipo_movimiento` (`id`, `nombre`) VALUES(3, 'Transferencia');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL,
  `nombrre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id`, `nombrre`) VALUES(1, 'Administrador');
INSERT INTO `tipo_usuario` (`id`, `nombrre`) VALUES(2, 'Interno');
INSERT INTO `tipo_usuario` (`id`, `nombrre`) VALUES(3, 'Cliente');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre_completo` varchar(64) NOT NULL,
  `documento` varchar(16) NOT NULL,
  `fecha_expedicion` date NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar(64) NOT NULL,
  `direccion` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo_documento_id` int(11) NOT NULL,
  `tipo_usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombre_completo`, `documento`, `fecha_expedicion`, `fecha_nacimiento`, `email`, `direccion`, `password`, `tipo_documento_id`, `tipo_usuario_id`) VALUES(1, 'Lina Ordoñez', '1001', '2000-05-30', '1982-06-29', 'lina@mail.com', 'Calle 101', '$2b$10$ESUgwq3Xq3oeKRGrN3ZL0uDKF5QsV069KFmijEo8hzn5zCjowGrDq', 1, 3);
INSERT INTO `usuario` (`id`, `nombre_completo`, `documento`, `fecha_expedicion`, `fecha_nacimiento`, `email`, `direccion`, `password`, `tipo_documento_id`, `tipo_usuario_id`) VALUES(2, 'Johnny Ocampo', '1002', '1999-06-30', '1972-07-29', 'johnny@mail.com', 'Carrera 101', '$2b$10$ESUgwq3Xq3oeKRGrN3ZL0uDKF5QsV069KFmijEo8hzn5zCjowGrDq', 1, 3);
INSERT INTO `usuario` (`id`, `nombre_completo`, `documento`, `fecha_expedicion`, `fecha_nacimiento`, `email`, `direccion`, `password`, `tipo_documento_id`, `tipo_usuario_id`) VALUES(3, 'Luis Fernando', '1003', '2003-03-05', '1984-02-13', 'luis@mail.com', 'Carrera 102', '$2b$10$ESUgwq3Xq3oeKRGrN3ZL0uDKF5QsV069KFmijEo8hzn5zCjowGrDq', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cuentacol_UNIQUE` (`numero`),
  ADD KEY `fk_cuenta_estado_idx` (`estado_id`),
  ADD KEY `fk_cuenta_usuario1_idx` (`usuario_id`);

--
-- Indexes for table `estado_cuenta`
--
ALTER TABLE `estado_cuenta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estado_solicitud`
--
ALTER TABLE `estado_solicitud`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movimiento_tipo_movimiento1_idx` (`tipo_movimiento_id`),
  ADD KEY `fk_movimiento_cuenta1_idx` (`cuenta_id`),
  ADD KEY `fk_movimiento_cuenta2_idx` (`cuenta_id_destino`);

--
-- Indexes for table `reclamo`
--
ALTER TABLE `reclamo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reclamo_movimiento1_idx` (`movimiento_id`),
  ADD KEY `fk_reclamo_respuesta1_idx` (`respuesta_id`),
  ADD KEY `fk_reclamo_usuario1_idx` (`usuario_id`);

--
-- Indexes for table `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_solicitud_cuenta1_idx` (`cuenta_id`),
  ADD KEY `fk_solicitud_estado_solicitud1_idx` (`estado_solicitud_id`),
  ADD KEY `fk_solicitud_usuario1_idx` (`usuario_id`);

--
-- Indexes for table `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipo_movimiento`
--
ALTER TABLE `tipo_movimiento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `documento_UNIQUE` (`documento`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `fk_cliente_tipo_documento1_idx` (`tipo_documento_id`),
  ADD KEY `fk_cliente_tipo_usuario1_idx` (`tipo_usuario_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `estado_cuenta`
--
ALTER TABLE `estado_cuenta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `estado_solicitud`
--
ALTER TABLE `estado_solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `reclamo`
--
ALTER TABLE `reclamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tipo_movimiento`
--
ALTER TABLE `tipo_movimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cuenta`
--
ALTER TABLE `cuenta`
  ADD CONSTRAINT `fk_cuenta_estado` FOREIGN KEY (`estado_id`) REFERENCES `estado_cuenta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cuenta_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `fk_movimiento_cuenta1` FOREIGN KEY (`cuenta_id`) REFERENCES `cuenta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_movimiento_cuenta2` FOREIGN KEY (`cuenta_id_destino`) REFERENCES `cuenta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_movimiento_tipo_movimiento1` FOREIGN KEY (`tipo_movimiento_id`) REFERENCES `tipo_movimiento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reclamo`
--
ALTER TABLE `reclamo`
  ADD CONSTRAINT `fk_reclamo_movimiento1` FOREIGN KEY (`movimiento_id`) REFERENCES `movimiento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reclamo_respuesta1` FOREIGN KEY (`respuesta_id`) REFERENCES `respuesta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reclamo_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `fk_solicitud_cuenta1` FOREIGN KEY (`cuenta_id`) REFERENCES `cuenta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitud_estado_solicitud1` FOREIGN KEY (`estado_solicitud_id`) REFERENCES `estado_solicitud` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitud_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_cliente_tipo_documento1` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipo_documento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cliente_tipo_usuario1` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
