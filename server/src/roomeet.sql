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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.categorias_hobbies: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias_hobbies` DISABLE KEYS */;
REPLACE INTO `categorias_hobbies` (`id`, `categoria`) VALUES
	(1, 'ninguna'),
	(2, 'musica'),
	(3, 'deporte');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.favoritos_user: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `favoritos_user` DISABLE KEYS */;
REPLACE INTO `favoritos_user` (`id`, `favorito`, `user_id`) VALUES
	(1, 2, 1),
	(2, 5, 1);
/*!40000 ALTER TABLE `favoritos_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.formas_contacto
CREATE TABLE IF NOT EXISTS `formas_contacto` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `forma` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.formas_contacto: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `formas_contacto` DISABLE KEYS */;
/*!40000 ALTER TABLE `formas_contacto` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.formas_contacto_user
CREATE TABLE IF NOT EXISTS `formas_contacto_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `forma_id` int(10) unsigned NOT NULL DEFAULT 0,
  `link` varchar(75) NOT NULL,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_fcu_forma` (`forma_id`),
  KEY `FK_fcu_user` (`user_id`),
  CONSTRAINT `FK_fcu_forma` FOREIGN KEY (`forma_id`) REFERENCES `formas_contacto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_fcu_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.formas_contacto_user: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `formas_contacto_user` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roomeet.fotos_user: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `fotos_user` DISABLE KEYS */;
REPLACE INTO `fotos_user` (`id`, `link`, `descripcion`, `user_id`) VALUES
	(17, '78273701_10215298077550667_1485843008338264064_n.jpg', 'Un tipo con una gata', 1),
	(18, '304892690_10221222435375910_3713512612682555694_n.jpg', 'Dibujito que hizo mi amorcito', 1),
	(19, 'miamor.jpg', 'Mi mujer <3', 1),
	(20, '17359415_1286945244722841_812214084910296585_o.jpg', NULL, 2),
	(21, '280671177_375458494530837_1878306170965297269_n.jpg', NULL, 2),
	(22, '304764058_10221222435335909_1081713666181243477_n.jpg', NULL, 2);
/*!40000 ALTER TABLE `fotos_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.hobbies
CREATE TABLE IF NOT EXISTS `hobbies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hobbie` varchar(50) NOT NULL DEFAULT '',
  `categoria_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hobbie_categoria` (`categoria_id`),
  CONSTRAINT `FK_hobbie_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_hobbies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.hobbies: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `hobbies` DISABLE KEYS */;
REPLACE INTO `hobbies` (`id`, `hobbie`, `categoria_id`) VALUES
	(1, 'Bailar', NULL),
	(2, 'Cantar', 2),
	(3, 'Leer', NULL),
	(4, 'Ping pong', 3);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.hobbies_user: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `hobbies_user` DISABLE KEYS */;
REPLACE INTO `hobbies_user` (`id`, `hobbie_id`, `user_id`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 1, 5),
	(4, 2, 1),
	(5, 2, 2),
	(6, 2, 5),
	(7, 3, 1),
	(8, 3, 2),
	(9, 3, 5);
/*!40000 ALTER TABLE `hobbies_user` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.peticion_contacto
CREATE TABLE IF NOT EXISTS `peticion_contacto` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acepta` int(11) DEFAULT NULL COMMENT '0: no, 1: si',
  `contactado_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_peticion_contactado` (`contactado_id`),
  KEY `FK_peticion_user` (`user_id`),
  CONSTRAINT `FK_peticion_contactado` FOREIGN KEY (`contactado_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_peticion_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla roomeet.peticion_contacto: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `peticion_contacto` DISABLE KEYS */;
/*!40000 ALTER TABLE `peticion_contacto` ENABLE KEYS */;

-- Volcando estructura para tabla roomeet.preferencias
CREATE TABLE IF NOT EXISTS `preferencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bebedor` int(11) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `fumador` int(11) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `fiestas` int(11) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `mascota` int(11) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `hijos` int(11) NOT NULL DEFAULT 1 COMMENT '0: no, 1: irrelevante, 2: si',
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `preferencias_FK` (`user_id`),
  CONSTRAINT `FK_preferencias_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roomeet.preferencias: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `preferencias` DISABLE KEYS */;
REPLACE INTO `preferencias` (`id`, `bebedor`, `fumador`, `fiestas`, `mascota`, `hijos`, `user_id`) VALUES
	(1, 0, 0, 0, 0, 0, 1);
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
  `password` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sexo` int(11) DEFAULT 2 COMMENT '0 = M; 1 = F; 2 = O',
  `profesion` int(11) DEFAULT NULL,
  `bebedor` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si',
  `fumador` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si',
  `fiestas` int(11) DEFAULT 0 COMMENT '0 = No; 1 = Si',
  `hijos` int(11) DEFAULT 0 COMMENT 'Cantidad de hijos',
  `foto_perfil` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT 'default.jpg',
  `estado` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Estado del usuario',
  `reputacion` int(10) unsigned DEFAULT 100,
  `role_id` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_IDX` (`username`) USING BTREE,
  UNIQUE KEY `user_email_IDX` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla roomeet.user: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `username`, `email`, `password`, `nombre`, `descripcion`, `sexo`, `profesion`, `bebedor`, `fumador`, `fiestas`, `hijos`, `foto_perfil`, `estado`, `reputacion`, `role_id`) VALUES
	(1, 'aksel2202', 'afyaksel@gmail.com', 'password', 'Aksel Galea', 'Descripcion epica digna de nobel', 0, NULL, 0, 0, 0, 0, '308198810_193998656430240_7511973942936051402_n.jpg', 0, 100, 'admin'),
	(2, 'yennuine', 'yenn@gmail.com', 'password', 'Yenn', 'Mi amorcito <3', 1, NULL, 0, 0, 0, 0, 'miamor.jpg', 0, 100, 'user'),
	(5, 'random', 'ormenhoaxel@gmail.com', 'password', '22', '123123', 2, NULL, 1, 1, 1, 1, 'default.jpg', 0, 100, 'user'),
	(6, 'aksel1', 'ormenhoaxel@hotmail.com', 'password', NULL, NULL, 2, NULL, 0, 0, 0, 0, 'default.jpg', 0, 100, 'user'),
	(12, 'aksel2', '123@123', '12345678', NULL, NULL, 2, NULL, 0, 0, 0, 0, 'default.jpg', 0, 100, 'user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
