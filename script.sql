-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2021 at 02:26 AM
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
  `estado_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estado`
--

INSERT INTO `estado` (`id`, `nombre`) VALUES(1, 'Activa');
INSERT INTO `estado` (`id`, `nombre`) VALUES(2, 'Inactiva');
INSERT INTO `estado` (`id`, `nombre`) VALUES(3, 'Suspendida');
INSERT INTO `estado` (`id`, `nombre`) VALUES(4, 'Bloqueada');
INSERT INTO `estado` (`id`, `nombre`) VALUES(5, 'Revisión');
INSERT INTO `estado` (`id`, `nombre`) VALUES(6, 'Otro');

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
  `respuesta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

INSERT INTO `usuario` (`id`, `nombre_completo`, `documento`, `fecha_expedicion`, `fecha_nacimiento`, `email`, `direccion`, `password`, `tipo_documento_id`, `tipo_usuario_id`) VALUES(1, 'A b', '1001', '2021-12-01', '2021-12-02', 'johnortizo@outlook.com', 'Calle 101', '$2b$10$8OmeMU5J5byQYzg9u6.CHuD1ziwk/V7XHX5226nFwC9DjBnh7VdOW', 1, 1);
INSERT INTO `usuario` (`id`, `nombre_completo`, `documento`, `fecha_expedicion`, `fecha_nacimiento`, `email`, `direccion`, `password`, `tipo_documento_id`, `tipo_usuario_id`) VALUES(2, 'C D', '1002', '2000-05-30', '1982-06-29', 'cd@mail.com', 'Calle 101', '$2b$10$ZPRG6teYVZuW8m5p93ViQOythi8QSxES.et2nodczhdLlHFpPNpT6', 1, 1);
INSERT INTO `usuario` (`id`, `nombre_completo`, `documento`, `fecha_expedicion`, `fecha_nacimiento`, `email`, `direccion`, `password`, `tipo_documento_id`, `tipo_usuario_id`) VALUES(6, 'Lina Ordoñez', '1003', '2021-12-01', '2022-01-01', 'lina@outlook.com', 'Carrera 10', '$2b$10$8OmeMU5J5byQYzg9u6.CHuD1ziwk/V7XHX5226nFwC9DjBnh7VdOW', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cuentacol_UNIQUE` (`numero`),
  ADD KEY `fk_cuenta_estado_idx` (`estado_id`);

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
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
  ADD KEY `fk_reclamo_respuesta1_idx` (`respuesta_id`);

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
  ADD KEY `fk_cliente_tipo_documento1_idx` (`tipo_documento_id`),
  ADD KEY `fk_cliente_tipo_usuario1_idx` (`tipo_usuario_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `reclamo`
--
ALTER TABLE `reclamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cuenta`
--
ALTER TABLE `cuenta`
  ADD CONSTRAINT `fk_cuenta_estado` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `fk_reclamo_respuesta1` FOREIGN KEY (`respuesta_id`) REFERENCES `respuesta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
