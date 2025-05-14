CREATE DATABASE IF NOT EXISTS roastlab_db;
USE roastlab_db;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `roastlab_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area_pro`
--

CREATE TABLE `area_pro` (
  `id` int(11) NOT NULL,
  `num_areascul` float NOT NULL,
  `tipo_produccion` varchar(40) NOT NULL,
  `vereda` varchar(150) NOT NULL,
  `latitud` varchar(255) NOT NULL,
  `longitud` varchar(255) NOT NULL,
  `cedula` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `area_pro`
--

INSERT INTO `area_pro` (`id`, `num_areascul`, `tipo_produccion`, `vereda`, `latitud`, `longitud`, `cedula`) VALUES
(1, 12, 'Especiales', 'venado', '4.26736523436752', '-75.93174934387208', '123'),
(2, 2.5, 'Especiales', 'venado', '4.3257341204731645', '-75.83085536956789', '1234'),
(3, 25, 'Ambos', 'corosal', '4.399553769956305', '-75.91934680938722', '1113313629'),
(4, 10, 'Tradicionales', 'El venado', '4.268714214806933', '-75.91621398925783', '1006192102');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cultivo`
--

CREATE TABLE `cultivo` (
  `id` varchar(50) NOT NULL,
  `variedad` int(11) NOT NULL,
  `edad_cultivo` float NOT NULL,
  `altura_snm` int(11) NOT NULL,
  `fertilizacion` tinyint(1) NOT NULL,
  `organico` tinyint(1) NOT NULL,
  `tipo_beneficio` int(11) NOT NULL,
  `estado_muestra` varchar(20) NOT NULL,
  `hectareas` double NOT NULL,
  `area_pro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cultivo`
--

INSERT INTO `cultivo` (`id`, `variedad`, `edad_cultivo`, `altura_snm`, `fertilizacion`, `organico`, `tipo_beneficio`, `estado_muestra`, `hectareas`, `area_pro`) VALUES
('CALA-BOR-H-0', 3, 10, 1800, 1, 0, 3, 'Seca', 10, 2),
('SEV-A14-H-0', 1, 1.5, 1518, 1, 0, 3, 'Humeda', 0, 1),
('SEV-A14-N-0', 1, 2, 1200, 1, 1, 2, 'Humeda', 1000, 3),
('SEV-BM71-N-0', 4, 2, 1450, 1, 0, 2, 'Humeda', 2000, 4),
('SEV-EVA-H-0', 14, 4, 1450, 0, 1, 3, 'Humeda', 2000, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fermentado`
--

CREATE TABLE `fermentado` (
  `id` int(11) NOT NULL,
  `temperatura` float NOT NULL,
  `fermentacion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`fermentacion`)),
  `pH` int(11) DEFAULT NULL,
  `grados_brix` float DEFAULT NULL,
  `microorganismos` tinyint(1) NOT NULL,
  `culturing` tinyint(1) NOT NULL,
  `info_microorganismo` varchar(170) DEFAULT NULL,
  `info_culturing` varchar(170) DEFAULT NULL,
  `cultivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fermentado`
--

INSERT INTO `fermentado` (`id`, `temperatura`, `fermentacion`, `pH`, `grados_brix`, `microorganismos`, `culturing`, `info_microorganismo`, `info_culturing`, `cultivo`) VALUES
(1, 25, '[{\"tipo\":\"Tradicional\",\"tiempo\":\"25\"},{\"tipo\":\"Tradicional\",\"tiempo\":\"20\"}]', 2, 20, 1, 1, 'algo', '', 'SEV-A14-H-0'),
(2, 26, '[{\"tipo\":\"macerasion\",\"tiempo\":\"10\"}]', 0, 12, 1, 0, 'algo', '', 'CALA-BOR-H-0'),
(3, 20, '[{\"tipo\":\"CO2\",\"tiempo\":\"5\"},{\"tipo\":\"Anarobico\",\"tiempo\":\"5\"}]', 2, 2, 0, 0, '', '', 'SEV-A14-N-0'),
(4, 21, '[{\"tipo\":\"Sumergido\",\"tiempo\":\"100\"}]', NULL, NULL, 0, 0, '', '', 'SEV-BM71-N-0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `id` int(11) NOT NULL,
  `nombre_mun` varchar(50) NOT NULL,
  `codigo_mun` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`id`, `nombre_mun`, `codigo_mun`) VALUES
(1, 'Alcalá', 'ALC'),
(2, 'Andalucía', 'AND'),
(3, 'Ansermanuevo', 'ANS'),
(4, 'Argelia', 'ARG'),
(5, 'Armenia', 'AXM'),
(6, 'Bolívar', 'BOL'),
(7, 'Buenaventura', 'BUERA'),
(8, 'Buenavista', 'BUETA'),
(9, 'Buga', 'BUG'),
(10, 'Bugalagrande', 'BUGDE'),
(11, 'Caicedonia', 'CAI'),
(12, 'Calarcá', 'CALA'),
(13, 'Cali', 'CLO'),
(14, 'Calima - El Darién', 'CALIM'),
(15, 'Candelaria', 'CAND'),
(16, 'Cartago', 'CART'),
(17, 'Circasia', 'CIRC'),
(18, 'Córdoba', 'CORD'),
(19, 'Dagua', 'DAG'),
(20, 'El Águila', 'AGUI'),
(21, 'El Cairo', 'CAIR'),
(22, 'El Cerrito', 'CER'),
(23, 'El Dovio', 'DOV'),
(24, 'Filandia', 'FIL'),
(25, 'Florida', 'FLO'),
(26, 'Génova', 'GEN'),
(27, 'Ginebra', 'GIN'),
(28, 'Guacarí', 'GUA'),
(29, 'Jamundí', 'JAM'),
(30, 'La Cumbre', 'CUMB'),
(31, 'La Tebaida', 'TEB'),
(32, 'La Unión', 'UNI'),
(33, 'La Victoria', 'VIC'),
(34, 'Montenegro', 'MON'),
(35, 'Obando', 'OBA'),
(36, 'Palmira', 'PAL'),
(37, 'Pijao', 'PIJ'),
(38, 'Pradera', 'PRA'),
(39, 'Quimbaya', 'QUI'),
(40, 'Restrepo', 'RES'),
(41, 'Riofrío', 'RIOF'),
(42, 'Roldanillo', 'ROL'),
(43, 'Salento', 'SAL'),
(44, 'San Pedro', 'SANP'),
(45, 'Sevilla', 'SEV'),
(46, 'Toro', 'TOR'),
(47, 'Trujillo', 'TRU'),
(48, 'Tuluá', 'TUL'),
(49, 'Ulloa', 'ULL'),
(50, 'Versalles', 'VER'),
(51, 'Vijes', 'VIJ'),
(52, 'Yotoco', 'YOT'),
(53, 'Yumbo', 'YUM'),
(54, 'Zarzal', 'ZAR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `cedula` varchar(10) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `tel` varchar(10) NOT NULL,
  `email` varchar(150) NOT NULL,
  `genero` varchar(15) NOT NULL,
  `municipio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`cedula`, `nombre`, `tel`, `email`, `genero`, `municipio`) VALUES
('1006192102', 'Sebastian Giraldo', '3112139450', 'sebastian.gply@gmail.com', 'Masculino', 45),
('1006373810', 'Camilo', '3053754468', 'camiloardila2930981@gmail.com', 'Masculino', 12),
('1006373813', 'Camilo Ardila', '3053754468', 'camiloardila2573@gmail.com', 'Masculino', 11),
('1113313629', 'anderson florez cardona', '3175952202', 'florez.cardona@gmail.com', 'Masculino', 45),
('123', 'anderson', '3175952202', 'florez.cardona@gmail.com', 'Masculino', 45),
('1234', 'luz belly', '3175911888', 'luz@gmail.com', 'Femenino', 12),
('159', 'florez', '123', 'si@gmail.com', 'Masculino', 2),
('29330981', 'Melo', '3234682549', 'camiloardila2930981@gmail.com', 'Femenino', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recibido`
--

CREATE TABLE `recibido` (
  `id` int(11) NOT NULL,
  `fecha_recibido` varchar(30) NOT NULL,
  `humedad` float NOT NULL,
  `A_W` float NOT NULL,
  `factor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`factor`)),
  `densidad` float NOT NULL,
  `color` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`color`)),
  `grados_b` float DEFAULT NULL,
  `p_h` int(11) DEFAULT NULL,
  `acidez` int(11) DEFAULT NULL,
  `info_adicional` text DEFAULT NULL,
  `cultivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recibido`
--

INSERT INTO `recibido` (`id`, `fecha_recibido`, `humedad`, `A_W`, `factor`, `densidad`, `color`, `grados_b`, `p_h`, `acidez`, `info_adicional`, `cultivo`) VALUES
(1, '2023-06-28', 10, 10, '[{\"malla18\":\"20\",\"malla17\":\"20\",\"malla16\":\"10\",\"malla15\":\"5\"}]', 12, '[{\"l\":\"2.5\",\"a\":\"2.0\",\"b\":\"1.4\",\"c\":\"1.5\",\"h\":\"4.3\"}]', 20, 2, 8, NULL, 'SEV-A14-H-0'),
(2, '2023-06-29', 10, 10, '[{}]', 10, '[{\"l\":\"1\",\"a\":\"2.5\",\"b\":\"3.5\",\"c\":\"2\",\"h\":\"2\"}]', 10, 10, 10, NULL, 'CALA-BOR-H-0'),
(3, '2023-06-26', 10, 10, '[{}]', 10, '[{\"l\":\"2\",\"a\":\"5\",\"b\":\"6\",\"c\":\"3\",\"h\":\"4\"}]', 15, 1, 3, NULL, 'SEV-A14-N-0'),
(4, '2025-05-14', 21, 8, '[{}]', 200, '[{\"l\":\"7\",\"a\":\"3\",\"b\":\"4\",\"c\":\"4\",\"h\":\"5\"}]', 100, 10, 99, 'Un cafe muy sabroso', 'SEV-BM71-N-0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secado`
--

CREATE TABLE `secado` (
  `id` int(11) NOT NULL,
  `temp_secado` float DEFAULT NULL,
  `humedad_relativa` float NOT NULL,
  `temp_ambiente` float NOT NULL,
  `tipo_secado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `tipo_combustible` int(11) NOT NULL,
  `tipo_silo` int(11) NOT NULL,
  `secado_continuo` tinyint(1) NOT NULL,
  `cultivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `secado`
--

INSERT INTO `secado` (`id`, `temp_secado`, `humedad_relativa`, `temp_ambiente`, `tipo_secado`, `tipo_combustible`, `tipo_silo`, `secado_continuo`, `cultivo`) VALUES
(1, 24, 24, 24, '[{\"tipo\":\"Solar y mecánico\",\"tiempo\":\"20\"},{\"tipo\":\"Intermitente\",\"tiempo\":\"10\"}]', 2, 4, 1, 'SEV-A14-H-0'),
(2, 0, 10, 10, '[{\"tipo\":\"Liofilización\",\"tiempo\":\"10\"},{\"tipo\":\"Intermitente\",\"tiempo\":\"50\"}]', 1, 6, 1, 'CALA-BOR-H-0'),
(3, 24, 1.5, 2, '[{\"tipo\":\"Solar\",\"tiempo\":\"2\"},{\"tipo\":\"Mecánico\",\"tiempo\":\"6\"}]', 6, 5, 1, 'SEV-A14-N-0'),
(4, NULL, 0, 0, '[{\"tipo\":\"Solar\",\"tiempo\":\"150\"}]', 4, 5, 1, 'SEV-BM71-N-0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensorial`
--

CREATE TABLE `sensorial` (
  `id` int(11) NOT NULL,
  `fragancia` float NOT NULL,
  `acidez` float NOT NULL,
  `dulzor` float NOT NULL,
  `sabor` float NOT NULL,
  `cuerpo` float NOT NULL,
  `uniformidad` float NOT NULL,
  `sabor_residual` float NOT NULL,
  `balance` float NOT NULL,
  `taza_limpia` float NOT NULL,
  `catador` float NOT NULL,
  `total` float NOT NULL,
  `cultivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensorial`
--

INSERT INTO `sensorial` (`id`, `fragancia`, `acidez`, `dulzor`, `sabor`, `cuerpo`, `uniformidad`, `sabor_residual`, `balance`, `taza_limpia`, `catador`, `total`, `cultivo`) VALUES
(1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 90, 'SEV-BM71-N-0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_beneficio`
--

CREATE TABLE `tipo_beneficio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `codigo` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_beneficio`
--

INSERT INTO `tipo_beneficio` (`id`, `nombre`, `codigo`) VALUES
(1, 'Lavado', 'L'),
(2, 'Natural', 'N'),
(3, 'Honey', 'H');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_combustible`
--

CREATE TABLE `tipo_combustible` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_combustible`
--

INSERT INTO `tipo_combustible` (`id`, `nombre`) VALUES
(1, 'Carbón'),
(2, 'Cisco'),
(3, 'Diesel'),
(4, 'Gas Natural'),
(5, 'Gas Propano'),
(6, 'Leña'),
(7, 'Energía Eléctrica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_silo`
--

CREATE TABLE `tipo_silo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_silo`
--

INSERT INTO `tipo_silo` (`id`, `nombre`) VALUES
(1, 'Bomba de Calor'),
(2, 'Circular de Capa Fija'),
(3, 'Cuadrado de 3 Mallas'),
(4, 'Elba'),
(5, 'Guardiola'),
(6, 'Marquesina'),
(7, 'Patio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trilla`
--

CREATE TABLE `trilla` (
  `id` int(11) NOT NULL,
  `humedad` float NOT NULL,
  `A_W` float NOT NULL,
  `factor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`factor`)),
  `densidad` float NOT NULL,
  `color` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`color`)),
  `grados_b` float DEFAULT NULL,
  `p_h` int(11) DEFAULT NULL,
  `acidez` int(11) DEFAULT NULL,
  `info_adicional` text DEFAULT NULL,
  `cultivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trilla`
--

INSERT INTO `trilla` (`id`, `humedad`, `A_W`, `factor`, `densidad`, `color`, `grados_b`, `p_h`, `acidez`, `info_adicional`, `cultivo`) VALUES
(1, 12, 10, '[{\"pesoInicia\":\"31\",\"malla18\":\"2\",\"malla17\":\"12\",\"malla16\":\"1\",\"malla15\":\"1\",\"malla14\":\"1\",\"malla13\":\"12\",\"malla12\":\"1\",\"malla0\":\"1\"}]', 10, '[{\"l\":\"2\",\"a\":\"1\",\"b\":\"1\",\"c\":\"1\",\"h\":\"1\"}]', 12, 10, 10, 'siuu', 'SEV-A14-H-0'),
(2, 10, 10, '[{\"pesoInicia\":\"81\",\"malla18\":\"7\",\"malla17\":\"11\",\"malla16\":\"14\",\"malla15\":\"10\",\"malla14\":\"10\",\"malla13\":\"10\",\"malla12\":\"10\",\"malla0\":\"10\"}]', 10, '[{\"l\":\"11\",\"a\":\"11\",\"b\":\"1\",\"c\":\"1\",\"h\":\"1\"}]', NULL, NULL, NULL, NULL, 'CALA-BOR-H-0'),
(3, 40, 63, '[{\"pesoInicia\":\"2000\",\"malla18\":\"1880\",\"malla17\":\"1750\",\"malla16\":\"1600\",\"malla15\":\"1490\",\"malla14\":\"1186\",\"malla13\":\"1150\",\"malla12\":\"1093\",\"malla0\":\"1027\"}]', 8, '[{\"l\":\"7\",\"a\":\"11\",\"b\":\"6\",\"c\":\"15\",\"h\":\"11\"}]', 100, 20, 43, 'Todo perfecto', 'SEV-BM71-N-0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tueste`
--

CREATE TABLE `tueste` (
  `id` int(11) NOT NULL,
  `humedad` float NOT NULL,
  `AW` float NOT NULL,
  `color_cielab` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`color_cielab`)),
  `agtrom` int(11) NOT NULL,
  `densidad` float NOT NULL,
  `curva_granulometrica` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `tipo_tueste` varchar(20) NOT NULL,
  `info_adicional` text DEFAULT NULL,
  `grados_b` double DEFAULT NULL,
  `p_h` double DEFAULT NULL,
  `acidez` double DEFAULT NULL,
  `cultivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tueste`
--

INSERT INTO `tueste` (`id`, `humedad`, `AW`, `color_cielab`, `agtrom`, `densidad`, `curva_granulometrica`, `tipo_tueste`, `info_adicional`, `grados_b`, `p_h`, `acidez`, `cultivo`) VALUES
(1, 10, 10, '[{\"l\":\"10\",\"a\":\"10\",\"b\":\"10\",\"c\":\"10\",\"h\":\"10\"}]', 26, 10, '[{\"pesoInicia\":\"7\",\"malla1\":\"1\",\"malla2\":\"1\",\"malla3\":\"1\",\"malla4\":\"1\",\"malla5\":\"1\",\"malla6\":\"2\"}]', 'Oscuro', NULL, NULL, NULL, NULL, 'CALA-BOR-H-0'),
(4, 20, 10, '[{\"l\":\"1\",\"a\":\"11\",\"b\":\"1\",\"c\":\"1\",\"h\":\"0\"}]', 65, 10, '[{\"pesoInicia\":\"32.5\",\"malla1\":\"2\",\"malla2\":\"12\",\"malla3\":\"4\",\"malla4\":\"4\",\"malla5\":\"2.5\",\"malla6\":\"2\",\"malla7\":\"2\",\"malla8\":\"4\"}]', 'Medio', NULL, 52, 52, 52, 'SEV-A14-H-0'),
(5, 100, 17, '[{\"l\":\"1\",\"a\":\"45\",\"b\":\"54\",\"c\":\"36\",\"h\":\"75\"}]', 60, 51, '[{\"pesoInicia\":\"590\",\"malla1\":\"300\",\"malla2\":\"45\",\"malla3\":\"81\",\"malla4\":\"70\",\"malla5\":\"55\",\"malla6\":\"48\",\"malla7\":\"43\",\"malla8\":\"39\"}]', 'Medio', 'asdasdasdasd', 52, 12, 34, 'SEV-BM71-N-0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` varchar(25) NOT NULL,
  `cedula` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `contraseña`, `rol`, `cedula`) VALUES
(1, 'camilo2051', 'camilo2051', 'Admin', '1006373813'),
(2, 'admin', 'admin', 'admin', '123'),
(9, 'florez.cardona@gmail.com', '123456', 'catador', '1113313629'),
(11, 'si@gmail.com', '123', 'catador', '159');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variedad`
--

CREATE TABLE `variedad` (
  `id` int(11) NOT NULL,
  `nombre_variedad` varchar(100) NOT NULL,
  `codigo_var` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variedad`
--

INSERT INTO `variedad` (`id`, `nombre_variedad`, `codigo_var`) VALUES
(1, 'Anacafe 14', 'A14'),
(2, 'Batian', 'BAT'),
(3, 'Borbón', 'BOR'),
(4, 'Bourbon Mayaguez 71', 'BM71'),
(5, 'Bourbon Mayaguez 139', 'BM139'),
(6, 'Casiopea', 'CAS'),
(7, 'Catimor 129', 'CA129'),
(8, 'Catisic', 'CATIC'),
(9, 'Catuai', 'CATAI'),
(10, 'Caturra', 'CATRRA'),
(11, 'Centroamericano', 'CTAME'),
(12, 'Costa Rica 95', 'CR95'),
(13, 'Cuscatleco', 'CUSLCO'),
(14, 'Evaluna', 'EVA'),
(15, 'Fronton', 'FRO'),
(16, 'Geisha', 'GEI'),
(17, 'H3', 'H3'),
(18, 'Harrar Rwanda', 'HARRWA'),
(19, 'IAPAR 59', 'IAP59'),
(20, 'IHCAFE 90', 'IHC90'),
(21, 'Jackson 2/1257', 'JAKSON'),
(22, 'Java', 'JAV'),
(23, 'K7', 'K7'),
(24, 'KP423', 'KP423'),
(25, 'Lempira', 'LEM'),
(26, 'Limani', 'LIM'),
(27, 'Maragogipe', 'MARIPE'),
(28, 'Marsellesa', 'MARESA'),
(29, 'Mibirizi', 'MIB'),
(30, 'Milenio', 'MIL'),
(31, 'Mundo Maya', 'MUMA'),
(32, 'Mundo Novo', 'MUNO'),
(33, 'Nayarita', 'NAY'),
(34, 'Nemaya', 'NEM'),
(35, 'Nyasaland', 'NYAS'),
(36, 'Obata Rojo', 'OBAR'),
(37, 'Oro Azteca', 'ORO'),
(38, 'Pacamara', 'PAMARA'),
(39, 'Pacas', 'PACA'),
(40, 'Pache', 'PACH'),
(41, 'Parainema', 'PARA'),
(42, 'Pop3303/21', 'POP'),
(43, 'RAB C15', 'RAC15'),
(44, 'Ruiru 11', 'RUI11'),
(45, 'SL14', 'SL14'),
(46, 'SL28', 'SL28'),
(47, 'SL34', 'SL34'),
(48, 'Starmaya', 'STAR'),
(49, 'T5175', 'T5175'),
(50, 'T5296', 'T5296'),
(51, 'T8667', 'T8667'),
(52, 'Tekisic', 'TEK'),
(53, 'Típica', 'TIP'),
(54, 'Venecia', 'VEN'),
(55, 'Villa Sarchí', 'VILSAR');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area_pro`
--
ALTER TABLE `area_pro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cedula_areapro` (`cedula`);

--
-- Indices de la tabla `cultivo`
--
ALTER TABLE `cultivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cultivo_areapro` (`area_pro`),
  ADD KEY `cultivo_variedad` (`variedad`),
  ADD KEY `cultivo_tipo_ben` (`tipo_beneficio`);

--
-- Indices de la tabla `fermentado`
--
ALTER TABLE `fermentado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fermentado_cultivo` (`cultivo`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`cedula`),
  ADD KEY `fk_municipios` (`municipio`);

--
-- Indices de la tabla `recibido`
--
ALTER TABLE `recibido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recibido_cultivo` (`cultivo`);

--
-- Indices de la tabla `secado`
--
ALTER TABLE `secado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `secado_cultivo` (`cultivo`),
  ADD KEY `secado_tiposilo` (`tipo_silo`),
  ADD KEY `secado_tipocombustible` (`tipo_combustible`);

--
-- Indices de la tabla `sensorial`
--
ALTER TABLE `sensorial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sensorial_cultivo` (`cultivo`);

--
-- Indices de la tabla `tipo_beneficio`
--
ALTER TABLE `tipo_beneficio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_combustible`
--
ALTER TABLE `tipo_combustible`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_silo`
--
ALTER TABLE `tipo_silo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trilla`
--
ALTER TABLE `trilla`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trilla_cultivo` (`cultivo`);

--
-- Indices de la tabla `tueste`
--
ALTER TABLE `tueste`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tueste_cultivo` (`cultivo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cedula_usuario` (`cedula`);

--
-- Indices de la tabla `variedad`
--
ALTER TABLE `variedad`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area_pro`
--
ALTER TABLE `area_pro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `fermentado`
--
ALTER TABLE `fermentado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `recibido`
--
ALTER TABLE `recibido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `secado`
--
ALTER TABLE `secado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sensorial`
--
ALTER TABLE `sensorial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_beneficio`
--
ALTER TABLE `tipo_beneficio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_combustible`
--
ALTER TABLE `tipo_combustible`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_silo`
--
ALTER TABLE `tipo_silo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `trilla`
--
ALTER TABLE `trilla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tueste`
--
ALTER TABLE `tueste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `variedad`
--
ALTER TABLE `variedad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `area_pro`
--
ALTER TABLE `area_pro`
  ADD CONSTRAINT `cedula_areapro` FOREIGN KEY (`cedula`) REFERENCES `persona` (`cedula`);

--
-- Filtros para la tabla `cultivo`
--
ALTER TABLE `cultivo`
  ADD CONSTRAINT `cultivo_areapro` FOREIGN KEY (`area_pro`) REFERENCES `area_pro` (`id`),
  ADD CONSTRAINT `cultivo_tipo_ben` FOREIGN KEY (`tipo_beneficio`) REFERENCES `tipo_beneficio` (`id`),
  ADD CONSTRAINT `cultivo_variedad` FOREIGN KEY (`variedad`) REFERENCES `variedad` (`id`);

--
-- Filtros para la tabla `fermentado`
--
ALTER TABLE `fermentado`
  ADD CONSTRAINT `fermentado_cultivo` FOREIGN KEY (`cultivo`) REFERENCES `cultivo` (`id`);

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `fk_municipios` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`id`);

--
-- Filtros para la tabla `recibido`
--
ALTER TABLE `recibido`
  ADD CONSTRAINT `recibido_cultivo` FOREIGN KEY (`cultivo`) REFERENCES `cultivo` (`id`);

--
-- Filtros para la tabla `secado`
--
ALTER TABLE `secado`
  ADD CONSTRAINT `secado_cultivo` FOREIGN KEY (`cultivo`) REFERENCES `cultivo` (`id`),
  ADD CONSTRAINT `secado_tipocombustible` FOREIGN KEY (`tipo_combustible`) REFERENCES `tipo_combustible` (`id`),
  ADD CONSTRAINT `secado_tiposilo` FOREIGN KEY (`tipo_silo`) REFERENCES `tipo_silo` (`id`);

--
-- Filtros para la tabla `sensorial`
--
ALTER TABLE `sensorial`
  ADD CONSTRAINT `sensorial_cultivo` FOREIGN KEY (`cultivo`) REFERENCES `cultivo` (`id`);

--
-- Filtros para la tabla `trilla`
--
ALTER TABLE `trilla`
  ADD CONSTRAINT `trilla_cultivo` FOREIGN KEY (`cultivo`) REFERENCES `cultivo` (`id`);

--
-- Filtros para la tabla `tueste`
--
ALTER TABLE `tueste`
  ADD CONSTRAINT `tueste_cultivo` FOREIGN KEY (`cultivo`) REFERENCES `cultivo` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `cedula_usuario` FOREIGN KEY (`cedula`) REFERENCES `persona` (`cedula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
