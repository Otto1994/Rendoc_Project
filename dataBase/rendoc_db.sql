-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 10 déc. 2022 à 15:43
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rendoc_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `Tel` varchar(13) NOT NULL,
  `email` varchar(40) NOT NULL,
  `psw` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `prenom`, `Tel`, `email`, `psw`) VALUES
(1, 'Bram', 'Zak', '777', 'adm@gmail.com', '123');

-- --------------------------------------------------------

--
-- Structure de la table `avis_medical`
--

CREATE TABLE `avis_medical` (
  `ida` int(11) NOT NULL,
  `message` text NOT NULL,
  `reponse` text DEFAULT NULL,
  `idPat` int(11) NOT NULL,
  `idMed` int(11) DEFAULT NULL,
  `dateMessage` varchar(30) NOT NULL,
  `dateReponse` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `avis_medical`
--

INSERT INTO `avis_medical` (`ida`, `message`, `reponse`, `idPat`, `idMed`, `dateMessage`, `dateReponse`) VALUES
(8, 'mal a la tete', 'bois doliprane', 13, 1, '2022-5-7', '2022-5-11'),
(9, 'mal au pieds\r\net au doits', 'coucou', 13, 1, '2022-5-7', '2022-5-11'),
(17, '123', 'non', 13, 30, '2022-5-19', '2022-5-19'),
(18, '123', 'salut tuout le monde', 13, 28, '2022-5-19', '2022-7-10');

-- --------------------------------------------------------

--
-- Structure de la table `cabinet`
--

CREATE TABLE `cabinet` (
  `idc` int(11) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `wilaya` varchar(30) NOT NULL,
  `idMed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cabinet`
--

INSERT INTO `cabinet` (`idc`, `adresse`, `wilaya`, `idMed`) VALUES
(1, 'ighil ali', 'Béjaia', 1),
(5, 'akbou', 'Béjaia', 23),
(6, 'hydra', 'Alger', 28),
(7, 'Ouled Saci', 'bejaia', 30),
(8, '123', 'Djelfa', 32);

-- --------------------------------------------------------

--
-- Structure de la table `medecin`
--

CREATE TABLE `medecin` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `Tel` varchar(13) NOT NULL,
  `email` varchar(40) NOT NULL,
  `psw` varchar(40) NOT NULL,
  `specialitee` varchar(30) NOT NULL,
  `idCab` int(11) DEFAULT NULL,
  `actif` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `medecin`
--

INSERT INTO `medecin` (`id`, `nom`, `prenom`, `Tel`, `email`, `psw`, `specialitee`, `idCab`, `actif`) VALUES
(1, 'bram', 'Zakaria', '0569584', 'doc@gmail.com', '123', 'Genéraliste', 1, 'oui'),
(23, 'bourai', 'imad', '0566', 'docad@gmail.com', '123', 'Genéraliste', 5, 'non'),
(28, 'oudihat', 'oulal', '123456789', 'doc5@gmail.com', '123', 'Psycologue', 6, 'oui'),
(30, 'Zakaria', 'Bram', '+213551511160', 'braham@gmail.com', '123', 'Dermatologue', 7, 'oui'),
(32, 'Zakaria', 'Bram', '222220', '123@gmail.com', '123', 'Dermatologue', 8, 'non');

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `Tel` varchar(13) NOT NULL,
  `email` varchar(40) NOT NULL,
  `psw` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `patient`
--

INSERT INTO `patient` (`id`, `nom`, `prenom`, `Tel`, `email`, `psw`) VALUES
(13, 'Zakaria', 'Bram', '+213551511160', 'brm.zkr@gmail.com', '123');

-- --------------------------------------------------------

--
-- Structure de la table `rendez_vous`
--

CREATE TABLE `rendez_vous` (
  `numR` int(11) NOT NULL,
  `dateR` varchar(10) NOT NULL,
  `heureR` varchar(8) NOT NULL,
  `statusR` varchar(1) NOT NULL,
  `medecinID` int(11) NOT NULL,
  `patientID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `rendez_vous`
--

INSERT INTO `rendez_vous` (`numR`, `dateR`, `heureR`, `statusR`, `medecinID`, `patientID`) VALUES
(2, '2022-05-20', '10:00', 'p', 1, NULL),
(1, '2022-05-20', '15:00', 'p', 1, NULL),
(5, '2022-05-21', '10:00', 'p', 1, NULL),
(10, '2022-07-14', '16:00', 'p', 28, NULL),
(12, '2022-10-22', '13:00', 't', 28, 13),
(11, '2022-10-23', '13:00', 'p', 28, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) DEFAULT NULL,
  `prenom` varchar(30) DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `psw` varchar(30) DEFAULT NULL,
  `type` varchar(30) NOT NULL DEFAULT 'patient'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `tel`, `email`, `psw`, `type`) VALUES
(13, 'Zakaria', 'Bram', '+213551511160', 'brm.zkr@gmail.com', '123', 'patient'),
(28, 'oudihat ', 'oulal', '123456789', 'doc5@gmail.com', '123', 'medecin'),
(30, 'AZERTY', 'QWERTY', '123456789', 'brm@gmail.com', '321', 'medecin'),
(31, 'brm', 'zak', '123546789', 'adm@gmail.com', '123', 'admin'),
(32, 'Zakaria', 'Bram', '222220', '123@gmail.com', '123', 'medecin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `avis_medical`
--
ALTER TABLE `avis_medical`
  ADD PRIMARY KEY (`ida`),
  ADD KEY `idPat` (`idPat`),
  ADD KEY `idMed` (`idMed`);

--
-- Index pour la table `cabinet`
--
ALTER TABLE `cabinet`
  ADD PRIMARY KEY (`idc`),
  ADD KEY `fk_medCab` (`idMed`);

--
-- Index pour la table `medecin`
--
ALTER TABLE `medecin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `medecin_cabb` (`idCab`);

--
-- Index pour la table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD PRIMARY KEY (`dateR`,`heureR`),
  ADD UNIQUE KEY `numR_Unique` (`numR`),
  ADD KEY `fk_medecin` (`medecinID`),
  ADD KEY `fk_patient` (`patientID`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis_medical`
--
ALTER TABLE `avis_medical`
  MODIFY `ida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `cabinet`
--
ALTER TABLE `cabinet`
  MODIFY `idc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  MODIFY `numR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis_medical`
--
ALTER TABLE `avis_medical`
  ADD CONSTRAINT `avis_medical_ibfk_1` FOREIGN KEY (`idPat`) REFERENCES `patient` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `avis_medical_ibfk_2` FOREIGN KEY (`idMed`) REFERENCES `medecin` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `cabinet`
--
ALTER TABLE `cabinet`
  ADD CONSTRAINT `fk_medCab` FOREIGN KEY (`idMed`) REFERENCES `medecin` (`id`);

--
-- Contraintes pour la table `medecin`
--
ALTER TABLE `medecin`
  ADD CONSTRAINT `medecin_cabb` FOREIGN KEY (`idCab`) REFERENCES `cabinet` (`idc`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD CONSTRAINT `fk_medecin` FOREIGN KEY (`medecinID`) REFERENCES `medecin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
