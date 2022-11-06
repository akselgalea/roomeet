-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.9.3-MariaDB - mariadb.org binary distribution
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
CREATE DATABASE IF NOT EXISTS `roomeet` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `roomeet`;

-- Volcando estructura para tabla roomeet.categorias_hobbies
CREATE TABLE IF NOT EXISTS `categorias_hobbies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.categorias_hobbies: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias_hobbies` DISABLE KEYS */;
REPLACE INTO `categorias_hobbies` (`id`, `categoria`) VALUES
	(1, 'otros'),
	(2, 'arte'),
	(3, 'deporte'),
	(4, 'literatura');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.contacto_user: ~0 rows (aproximadamente)
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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.favoritos_user: ~21 rows (aproximadamente)
/*!40000 ALTER TABLE `favoritos_user` DISABLE KEYS */;
REPLACE INTO `favoritos_user` (`id`, `favorito`, `user_id`) VALUES
	(10, 2, 75),
	(16, 6, 75),
	(17, 12, 75),
	(18, 74, 75),
	(21, 1, 75),
	(34, 2, 1),
	(35, 5, 1),
	(36, 6, 1),
	(40, 1, 2),
	(41, 6, 2),
	(42, 12, 2),
	(44, 1, 6),
	(45, 2, 6),
	(46, 5, 6),
	(47, 12, 6),
	(48, 75, 6),
	(49, 74, 6),
	(50, 2, 5),
	(52, 6, 5),
	(77, 2, 74),
	(78, 75, 1);
/*!40000 ALTER TABLE `favoritos_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.formas_contacto
CREATE TABLE IF NOT EXISTS `formas_contacto` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `forma` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.formas_contacto: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `formas_contacto` DISABLE KEYS */;
REPLACE INTO `formas_contacto` (`id`, `forma`) VALUES
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.formas_contacto_user: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `formas_contacto_user` DISABLE KEYS */;
REPLACE INTO `formas_contacto_user` (`id`, `forma_id`, `link`, `user_id`) VALUES
	(3, 7, 'correo@correo.cl', 2),
	(4, 1, 'https://www.facebook.com', 2),
	(6, 3, 'https://www.instagram.com', 2),
	(7, 1, 'facebook.com/aksel2202', 1),
	(9, 2, '+56971636501', 1);
/*!40000 ALTER TABLE `formas_contacto_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.fotos_publicaciones
CREATE TABLE IF NOT EXISTS `fotos_publicaciones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL,
  `publicacion_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_foto_publicacion` (`publicacion_id`),
  CONSTRAINT `FK_foto_publicacion` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.fotos_publicaciones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `fotos_publicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `fotos_publicaciones` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.fotos_user
CREATE TABLE IF NOT EXISTS `fotos_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fotos_user_user` (`user_id`),
  CONSTRAINT `FK_fotos_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roomeet.fotos_user: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `fotos_user` DISABLE KEYS */;
REPLACE INTO `fotos_user` (`id`, `link`, `descripcion`, `user_id`) VALUES
	(23, 'uploads/1665633249103_miamor.jpg', 'Mi amoooorrr <3', 1),
	(24, 'uploads/1665634436790_278559119_10220626151429184_3524319958639572027_n.jpg', 'Yo con lentes', 1),
	(25, 'uploads/1665634499873_78273701_10215298077550667_1485843008338264064_n.jpg', 'Yo con un gato', 1),
	(26, 'uploads/1665634512901_308198810_193998656430240_7511973942936051402_n.jpg', 'Dibujo que hizo el amor de mi vida', 1),
	(27, 'uploads/1665634537104_304892690_10221222435375910_3713512612682555694_n.jpg', 'Caricatura que hizo mi mujer', 1),
	(28, 'uploads/1665673900907_280671177_375458494530837_1878306170965297269_n.jpg', '', 2),
	(29, 'uploads/1665673907295_17359415_1286945244722841_812214084910296585_o.jpg', '', 2),
	(30, 'uploads/1665673916797_304764058_10221222435335909_1081713666181243477_n.jpg', '', 2),
	(31, 'uploads/1665673977755_304892690_10221222435375910_3713512612682555694_n.jpg', '', 5);
/*!40000 ALTER TABLE `fotos_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.hobbies
CREATE TABLE IF NOT EXISTS `hobbies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hobbie` varchar(50) NOT NULL DEFAULT '',
  `categoria_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hobbie` (`hobbie`),
  KEY `FK_hobbie_categoria` (`categoria_id`),
  CONSTRAINT `FK_hobbie_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_hobbies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.hobbies: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `hobbies` DISABLE KEYS */;
REPLACE INTO `hobbies` (`id`, `hobbie`, `categoria_id`) VALUES
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
	(17, 'dibujar', 2);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.hobbies_user: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `hobbies_user` DISABLE KEYS */;
REPLACE INTO `hobbies_user` (`id`, `hobbie_id`, `user_id`) VALUES
	(2, 1, 2),
	(3, 1, 5),
	(4, 2, 1),
	(5, 2, 2),
	(6, 2, 5),
	(7, 3, 1),
	(8, 3, 2),
	(9, 3, 5),
	(11, 1, 1),
	(15, 4, 1),
	(16, 11, 1),
	(17, 12, 1),
	(18, 13, 1),
	(19, 14, 1),
	(20, 15, 1),
	(21, 16, 1),
	(22, 17, 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.peticion_contacto: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `peticion_contacto` DISABLE KEYS */;
REPLACE INTO `peticion_contacto` (`id`, `estado`, `contactado_id`, `user_id`) VALUES
	(1, 1, 1, 2),
	(2, 2, 1, 6),
	(3, 2, 1, 12),
	(4, 2, 1, 5),
	(6, 1, 2, 1),
	(19, 0, 75, 74),
	(20, 1, 1, 74),
	(21, 0, 2, 74),
	(22, 1, 5, 1),
	(23, 0, 75, 1);
/*!40000 ALTER TABLE `peticion_contacto` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.preferencias
CREATE TABLE IF NOT EXISTS `preferencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sexo` int(1) NOT NULL DEFAULT 2 COMMENT '0: hombre, 1: mujer, 2:irrelevante',
  `bebedor` int(1) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `fumador` int(1) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `fiestas` int(1) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `mascotas` int(1) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `hijos` int(1) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `preferencias_FK` (`user_id`),
  CONSTRAINT `FK_preferencias_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roomeet.preferencias: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `preferencias` DISABLE KEYS */;
REPLACE INTO `preferencias` (`id`, `sexo`, `bebedor`, `fumador`, `fiestas`, `mascotas`, `hijos`, `user_id`) VALUES
	(1, 0, 0, 0, 0, 0, 0, 1),
	(3, 0, 0, 0, 0, 0, 0, 74),
	(4, 2, 0, 0, 0, 1, 0, 12);
/*!40000 ALTER TABLE `preferencias` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.publicaciones
CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `texto` tinytext NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_publicaciones_user` (`user_id`),
  CONSTRAINT `FK_publicaciones_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.publicaciones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sexo` int(11) DEFAULT 2 COMMENT '0 = M; 1 = F; 2 = O',
  `profesion` int(11) DEFAULT NULL,
  `bebedor` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si',
  `fumador` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si',
  `fiestas` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si',
  `mascotas` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si',
  `hijos` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si // Cantidad de hijos',
  `foto_perfil` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT 'uploads/default.jpg',
  `estado` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Estado del usuario',
  `reputacion` int(10) unsigned DEFAULT 100,
  `role_id` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_IDX` (`username`) USING BTREE,
  UNIQUE KEY `user_email_IDX` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roomeet.user: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `username`, `email`, `password`, `nombre`, `descripcion`, `sexo`, `profesion`, `bebedor`, `fumador`, `fiestas`, `mascotas`, `hijos`, `foto_perfil`, `estado`, `reputacion`, `role_id`) VALUES
	(1, 'aksel2202', 'afyaksel@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Aksel Galea', 'Descripción épica digna de nobel 😎', 0, 0, 0, 0, 0, 1, 0, 'uploads/1665634512901_308198810_193998656430240_7511973942936051402_n.jpg', 0, 100, 'admin'),
	(2, 'yennuine', 'yenn@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Yenn', 'Mi amorcito <3', 1, NULL, 0, 0, 0, 0, 0, 'uploads/1665633249103_miamor.jpg', 0, 100, 'user'),
	(5, 'random', 'ormenhoaxel@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Nombre Random', '123123', 0, NULL, 1, 1, 1, 0, 1, 'uploads/default.jpg', 0, 100, 'user'),
	(6, 'aksel1', 'ormenhoaxel@hotmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Aksel Ormeño', NULL, 0, NULL, 0, 0, 0, 0, 0, 'uploads/default.jpg', 0, 100, 'user'),
	(12, 'aksel2', '123@123', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Axel 2022', NULL, 0, NULL, 0, 0, 0, 0, 0, 'uploads/default.jpg', 0, 100, 'user'),
	(74, 'usuario', '1@1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Usuario premium 1', 'Soy un usuario premium rey!', 2, NULL, 0, 0, 0, 0, 0, 'uploads/default.jpg', 0, 100, 'user'),
	(75, 'usuario2', '1@2', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Nombresaso', NULL, 2, NULL, 0, 0, 0, 0, 0, 'uploads/default.jpg', 0, 100, 'user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
