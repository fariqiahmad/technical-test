CREATE TABLE `user` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `UserName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Parent` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  
INSERT INTO user values(1, 'Ali', 2),(2, 'Budi', 0),(3, 'Cecep', 1);

SELECT a.ID, a.UserName, b.UserName AS ParentUserName FROM user a LEFT JOIN user b ON a.parent = b.id;