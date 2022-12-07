-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.10.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para roomeet
CREATE DATABASE IF NOT EXISTS `roomeet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `roomeet`;

-- Volcando estructura para tabla roomeet.categorias_hobbies
CREATE TABLE IF NOT EXISTS `categorias_hobbies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.categorias_hobbies: ~5 rows (aproximadamente)
DELETE FROM `categorias_hobbies`;
/*!40000 ALTER TABLE `categorias_hobbies` DISABLE KEYS */;
INSERT INTO `categorias_hobbies` (`id`, `categoria`) VALUES
	(1, 'otros'),
	(2, 'arte'),
	(3, 'deporte'),
	(4, 'literatura'),
	(5, 'estudios');
/*!40000 ALTER TABLE `categorias_hobbies` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.contacto_user
CREATE TABLE IF NOT EXISTS `contacto_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `instagram` varchar(50) DEFAULT NULL,
  `telegram` varchar(50) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_contacto_user` (`user_id`),
  CONSTRAINT `FK_contacto_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.contacto_user: ~0 rows (aproximadamente)
DELETE FROM `contacto_user`;
/*!40000 ALTER TABLE `contacto_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacto_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.favoritos_user
CREATE TABLE IF NOT EXISTS `favoritos_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `favorito` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_favorito_user_favorito` (`favorito`),
  KEY `FK_favorito_user_user` (`user_id`),
  CONSTRAINT `FK_favorito_user_favorito` FOREIGN KEY (`favorito`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_favorito_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.favoritos_user: ~20 rows (aproximadamente)
DELETE FROM `favoritos_user`;
/*!40000 ALTER TABLE `favoritos_user` DISABLE KEYS */;
INSERT INTO `favoritos_user` (`id`, `favorito`, `user_id`) VALUES
	(10, 2, 75),
	(16, 6, 75),
	(17, 12, 75),
	(18, 74, 75),
	(21, 1, 75),
	(40, 1, 2),
	(41, 6, 2),
	(44, 1, 6),
	(45, 2, 6),
	(46, 5, 6),
	(47, 12, 6),
	(48, 75, 6),
	(49, 74, 6),
	(50, 2, 5),
	(52, 6, 5),
	(86, 2, 1),
	(87, 5, 2),
	(88, 83, 84),
	(89, 1, 84),
	(90, 84, 1);
/*!40000 ALTER TABLE `favoritos_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.formas_contacto
CREATE TABLE IF NOT EXISTS `formas_contacto` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `forma` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.formas_contacto: ~7 rows (aproximadamente)
DELETE FROM `formas_contacto`;
/*!40000 ALTER TABLE `formas_contacto` DISABLE KEYS */;
INSERT INTO `formas_contacto` (`id`, `forma`) VALUES
	(1, 'Facebook'),
	(2, 'Whatsapp'),
	(3, 'Instagram'),
	(4, 'Twitter'),
	(5, 'Telegram'),
	(6, 'Celular'),
	(7, 'Correo');
/*!40000 ALTER TABLE `formas_contacto` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.formas_contacto_user
CREATE TABLE IF NOT EXISTS `formas_contacto_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `forma_id` int(10) unsigned NOT NULL,
  `link` varchar(75) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fcu_forma` (`forma_id`),
  KEY `FK_fcu_user` (`user_id`),
  CONSTRAINT `FK_fcu_forma` FOREIGN KEY (`forma_id`) REFERENCES `formas_contacto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_fcu_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.formas_contacto_user: ~6 rows (aproximadamente)
DELETE FROM `formas_contacto_user`;
/*!40000 ALTER TABLE `formas_contacto_user` DISABLE KEYS */;
INSERT INTO `formas_contacto_user` (`id`, `forma_id`, `link`, `user_id`) VALUES
	(3, 7, 'correo@correo.cl', 2),
	(4, 1, 'https://www.facebook.com', 2),
	(6, 3, 'https://www.instagram.com', 2),
	(7, 1, 'facebook.com/aksel2202', 1),
	(9, 2, '+56971636501', 1),
	(11, 1, 'facebook.com/aksel2202', 1);
/*!40000 ALTER TABLE `formas_contacto_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.fotos_publicaciones
CREATE TABLE IF NOT EXISTS `fotos_publicaciones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL,
  `publicacion_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_foto_publicacion` (`publicacion_id`),
  CONSTRAINT `FK_foto_publicacion` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.fotos_publicaciones: ~0 rows (aproximadamente)
DELETE FROM `fotos_publicaciones`;
/*!40000 ALTER TABLE `fotos_publicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `fotos_publicaciones` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.fotos_user
CREATE TABLE IF NOT EXISTS `fotos_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(500) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fotos_user_user` (`user_id`),
  CONSTRAINT `FK_fotos_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.fotos_user: ~7 rows (aproximadamente)
DELETE FROM `fotos_user`;
/*!40000 ALTER TABLE `fotos_user` DISABLE KEYS */;
INSERT INTO `fotos_user` (`id`, `link`, `descripcion`, `user_id`) VALUES
	(23, 'uploads/1665633249103_miamor.jpg', 'Mi amoooorrr <3', 1),
	(26, 'uploads/1665634512901_308198810_193998656430240_7511973942936051402_n.jpg', 'Dibujo que hizo el amor de mi vida', 1),
	(27, 'uploads/1665634537104_304892690_10221222435375910_3713512612682555694_n.jpg', 'Caricatura que hizo mi mujer', 1),
	(28, 'uploads/1665673900907_280671177_375458494530837_1878306170965297269_n.jpg', 'En playa brava', 2),
	(29, 'uploads/1665673907295_17359415_1286945244722841_812214084910296585_o.jpg', '', 2),
	(30, 'uploads/1665673916797_304764058_10221222435335909_1081713666181243477_n.jpg', '', 2),
	(31, 'uploads/1665673977755_304892690_10221222435375910_3713512612682555694_n.jpg', '', 5);
/*!40000 ALTER TABLE `fotos_user` ENABLE KEYS */;

-- Volcando estructura para procedimiento roomeet.getHobbies
DELIMITER //
CREATE PROCEDURE `getHobbies`(
	IN `userId` INT
)
BEGIN
	SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = userId ORDER BY h.categoria_id DESC;
END//
DELIMITER ;

-- Volcando estructura para procedimiento roomeet.getInfoContacto
DELIMITER //
CREATE PROCEDURE `getInfoContacto`(
	IN `userId` INT,
	IN `userRequestingId` INT
)
BEGIN
	IF (SELECT COUNT(id) FROM peticion_contacto WHERE estado = 1 AND user_id = userRequestingId AND contactado_id = userId) > 0 THEN
   	SELECT fu.id, f.forma, fu.link FROM formas_contacto_user AS fu
   	JOIN formas_contacto AS f ON f.id = fu.forma_id WHERE fu.user_id = userId;
   ELSE
   	SIGNAL SQLSTATE '45000' SET
      MESSAGE_TEXT = 'No tienes permiso para acceder a la información de contacto de este usuario';
   END IF;
END//
DELIMITER ;

-- Volcando estructura para procedimiento roomeet.getUsers
DELIMITER //
CREATE PROCEDURE `getUsers`(
	IN `userId` INT,
	IN `prefSexo` ENUM('Masculino','Femenino', 'Irrelevante')
)
BEGIN
	IF prefSexo = 'Masculino' OR prefSexo = 'Femenino' THEN
		SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE id != userId AND sexo = prefSexo
		EXCEPT SELECT u.id, u.username, u.nombre, u.descripcion, u.sexo, u.profesion, u.bebedor, u.fumador, u.fiestas, u.mascotas, u.hijos, u.foto_perfil FROM favoritos_user
		JOIN user as u ON favorito = u.id WHERE user_id = userId;
	ELSE
		SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE id != userId
		EXCEPT SELECT u.id, u.username, u.nombre, u.descripcion, u.sexo, u.profesion, u.bebedor, u.fumador, u.fiestas, u.mascotas, u.hijos, u.foto_perfil FROM favoritos_user
		JOIN user as u ON favorito = u.id WHERE user_id = userId;
	END IF;
END//
DELIMITER ;

-- Volcando estructura para tabla roomeet.hobbies
CREATE TABLE IF NOT EXISTS `hobbies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hobbie` varchar(50) NOT NULL DEFAULT '',
  `categoria_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hobbie` (`hobbie`),
  KEY `FK_hobbie_categoria` (`categoria_id`),
  CONSTRAINT `FK_hobbie_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_hobbies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.hobbies: ~13 rows (aproximadamente)
DELETE FROM `hobbies`;
/*!40000 ALTER TABLE `hobbies` DISABLE KEYS */;
INSERT INTO `hobbies` (`id`, `hobbie`, `categoria_id`) VALUES
	(1, 'bailar', 2),
	(2, 'cantar', 2),
	(3, 'leer', 4),
	(4, 'ping pong', 3),
	(11, 'escultura', 2),
	(12, 'escritor', 4),
	(13, 'futbol', 3),
	(14, 'coleccionar tazos', 1),
	(15, 'astrologia', 1),
	(16, 'pintar', 2),
	(17, 'dibujar', 2),
	(27, 'artesania', 2),
	(28, 'lecturas', 5);
/*!40000 ALTER TABLE `hobbies` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.hobbies_user
CREATE TABLE IF NOT EXISTS `hobbies_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hobbie_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hobbies_user_hobbie` (`hobbie_id`),
  KEY `FK_hobbies_user_user` (`user_id`),
  CONSTRAINT `FK_hobbies_user_hobbie` FOREIGN KEY (`hobbie_id`) REFERENCES `hobbies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_hobbies_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.hobbies_user: ~23 rows (aproximadamente)
DELETE FROM `hobbies_user`;
/*!40000 ALTER TABLE `hobbies_user` DISABLE KEYS */;
INSERT INTO `hobbies_user` (`id`, `hobbie_id`, `user_id`) VALUES
	(3, 1, 5),
	(4, 2, 1),
	(5, 2, 2),
	(6, 2, 5),
	(8, 3, 2),
	(9, 3, 5),
	(11, 1, 1),
	(16, 11, 1),
	(21, 16, 1),
	(22, 17, 1),
	(24, 1, 74),
	(25, 2, 74),
	(26, 11, 74),
	(27, 16, 74),
	(28, 17, 74),
	(29, 1, 2),
	(30, 11, 2),
	(31, 16, 2),
	(32, 17, 2),
	(33, 27, 84),
	(34, 28, 84),
	(35, 2, 84),
	(36, 13, 1);
/*!40000 ALTER TABLE `hobbies_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.peticion_contacto
CREATE TABLE IF NOT EXISTS `peticion_contacto` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `estado` int(1) unsigned NOT NULL DEFAULT 0 COMMENT '0: pendiente, 1: aceptado, 2: rechazado',
  `contactado_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_peticion_contactado` (`contactado_id`),
  KEY `FK_peticion_user` (`user_id`),
  CONSTRAINT `FK_peticion_contactado` FOREIGN KEY (`contactado_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_peticion_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.peticion_contacto: ~13 rows (aproximadamente)
DELETE FROM `peticion_contacto`;
/*!40000 ALTER TABLE `peticion_contacto` DISABLE KEYS */;
INSERT INTO `peticion_contacto` (`id`, `estado`, `contactado_id`, `user_id`) VALUES
	(1, 0, 1, 2),
	(2, 2, 1, 6),
	(3, 2, 1, 12),
	(4, 2, 1, 5),
	(6, 1, 2, 1),
	(20, 0, 1, 74),
	(21, 0, 2, 74),
	(22, 1, 5, 1),
	(26, 1, 74, 1),
	(27, 0, 5, 2),
	(29, 0, 83, 84),
	(30, 1, 84, 1),
	(31, 1, 1, 84);
/*!40000 ALTER TABLE `peticion_contacto` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.preferencias
CREATE TABLE IF NOT EXISTS `preferencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sexo` enum('Masculino','Femenino','Irrelevante') DEFAULT 'Irrelevante' COMMENT '0: hombre, 1: mujer, 2:irrelevante',
  `bebedor` enum('No','Si','Irrelevante') DEFAULT NULL COMMENT '0: no, 1: si, 2: irrelevante',
  `fumador` enum('No','Si','Irrelevante') DEFAULT NULL COMMENT '0: no, 1: si, 2: irrelevante',
  `fiestas` enum('No','Si','Irrelevante') DEFAULT NULL COMMENT '0: no, 1: si, 2: irrelevante',
  `mascotas` enum('No','Si','Irrelevante') DEFAULT NULL COMMENT '0: no, 1: si, 2: irrelevante',
  `hijos` enum('No','Si','Irrelevante') DEFAULT NULL COMMENT '0: no, 1: si, 2: irrelevante',
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `preferencias_FK` (`user_id`),
  CONSTRAINT `FK_preferencias_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.preferencias: ~3 rows (aproximadamente)
DELETE FROM `preferencias`;
/*!40000 ALTER TABLE `preferencias` DISABLE KEYS */;
INSERT INTO `preferencias` (`id`, `sexo`, `bebedor`, `fumador`, `fiestas`, `mascotas`, `hijos`, `user_id`) VALUES
	(8, 'Femenino', 'Irrelevante', 'No', 'No', 'Irrelevante', 'No', 1),
	(9, 'Masculino', 'No', 'No', 'No', 'Irrelevante', 'No', 2),
	(11, NULL, NULL, NULL, NULL, 'Si', NULL, 84);
/*!40000 ALTER TABLE `preferencias` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.publicaciones
CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `texto` tinytext NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_publicaciones_user` (`user_id`),
  CONSTRAINT `FK_publicaciones_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.publicaciones: ~0 rows (aproximadamente)
DELETE FROM `publicaciones`;
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.reporte
CREATE TABLE IF NOT EXISTS `reporte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `motivo` varchar(50) DEFAULT NULL,
  `reporte` tinytext DEFAULT NULL,
  `estado` enum('Revisado','Pendiente') NOT NULL DEFAULT 'Pendiente',
  `reportado_id` int(11) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reporte_user` (`user_id`),
  KEY `FK_reporte_reportado` (`reportado_id`),
  CONSTRAINT `FK_reporte_reportado` FOREIGN KEY (`reportado_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_reporte_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.reporte: ~3 rows (aproximadamente)
DELETE FROM `reporte`;
/*!40000 ALTER TABLE `reporte` DISABLE KEYS */;
INSERT INTO `reporte` (`id`, `motivo`, `reporte`, `estado`, `reportado_id`, `user_id`) VALUES
	(1, 'Perfil ofensivo', 'Ofensivo', 'Pendiente', 5, 1),
	(2, 'Perfil ofensivo', 'asdasdasd', 'Pendiente', 12, 1),
	(3, 'Otro', 'Porque se me da la gana en verdad! :D', 'Pendiente', 75, 1);
/*!40000 ALTER TABLE `reporte` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `sexo` enum('Masculino','Femenino','No Binario') DEFAULT 'No Binario' COMMENT '0 = M; 1 = F; 2 = O',
  `profesion` enum('Estudiante','Trabajador','Desempleado') DEFAULT 'Estudiante',
  `bebedor` enum('Si','No') DEFAULT 'No' COMMENT '0 = No; 1 = Si',
  `fumador` enum('Si','No') DEFAULT 'No' COMMENT '0 = No; 1 = Si',
  `fiestas` enum('Si','No') DEFAULT 'No' COMMENT '0 = No; 1 = Si',
  `mascotas` enum('Si','No') DEFAULT 'No' COMMENT '0 = No; 1 = Si',
  `hijos` enum('Si','No') DEFAULT 'No' COMMENT '0 = No; 1 = Si // Cantidad de hijos',
  `foto_perfil` varchar(500) DEFAULT 'uploads/default.jpg',
  `estado` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Estado del usuario',
  `reputacion` int(10) unsigned DEFAULT 100,
  `role_id` varchar(7) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_IDX` (`username`) USING BTREE,
  UNIQUE KEY `user_email_IDX` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla roomeet.user: ~11 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `email`, `password`, `nombre`, `descripcion`, `sexo`, `profesion`, `bebedor`, `fumador`, `fiestas`, `mascotas`, `hijos`, `foto_perfil`, `estado`, `reputacion`, `role_id`) VALUES
	(1, 'aksel2202', 'afyaksel@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Aksel Galea', 'Descripción épica digna de nobel 😎', 'Masculino', 'Estudiante', 'No', 'No', 'No', 'No', 'No', 'uploads/1665634512901_308198810_193998656430240_7511973942936051402_n.jpg', 0, 100, 'admin'),
	(2, 'yennuine', 'yenn@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Yenn', '', 'Femenino', 'Estudiante', 'No', 'No', 'No', 'No', 'No', 'uploads/1665633249103_miamor.jpg', 0, 100, 'user'),
	(5, 'random', 'ormenhoaxel@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Nombre Random', '123123', 'Masculino', 'Estudiante', 'Si', 'No', 'Si', 'No', 'No', 'uploads/default.jpg', 0, 100, 'user'),
	(6, 'aksel1', 'ormenhoaxel@hotmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Aksel Ormeño', NULL, 'Masculino', 'Estudiante', 'No', 'Si', 'No', 'No', 'No', 'uploads/default.jpg', 0, 100, 'user'),
	(12, 'aksel2', '123@123', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Ser Humano', NULL, 'No Binario', 'Estudiante', 'No', 'No', 'No', 'No', 'No', 'uploads/default.jpg', 0, 100, 'user'),
	(74, 'usuario', '1@1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Usuario premium 1', 'Soy un usuario premium rey!', 'Femenino', 'Estudiante', 'No', 'No', 'No', 'Si', 'No', 'uploads/default.jpg', 0, 100, 'user'),
	(75, 'usuario2', '1@2', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Nombresaso', NULL, 'Femenino', 'Estudiante', 'No', 'Si', 'No', 'No', 'No', 'uploads/default.jpg', 0, 100, 'user'),
	(79, 'cris123', 'cris@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Cristian Del Villar', 'Descripcion!', 'Masculino', 'Estudiante', 'No', 'No', 'No', 'No', 'No', 'uploads\\1667872174560_code.png', 0, 100, 'user'),
	(81, 'usuarioprueba', 'prueba@mail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Usuario De Prueba', NULL, 'No Binario', 'Estudiante', 'No', 'No', 'Si', 'No', 'No', 'uploads/default.jpg', 0, 100, 'user'),
	(83, 'aksel220', 'dahzek4ever@hotmail.com', '8b6fa01313ce51afc09e610f819250da501778ad363cba4f9e312a6ec823d42a', 'Persona III', NULL, 'Masculino', 'Estudiante', 'Si', 'Si', 'Si', 'No', 'No', 'uploads/default.jpg', 0, 100, 'user'),
	(84, 'pamela', 'pamela.hermosilla@pucv.cl', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Pamela Hermosilla', '', 'Femenino', 'Desempleado', 'No', 'No', 'No', 'Si', 'Si', 'uploads\\1669728727616_arquitectura logica.jpg', 0, 100, 'user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
