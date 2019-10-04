/*
 Navicat Premium Data Transfer

 Source Server         : 47.111.22.103
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : 47.111.22.103:3306
 Source Schema         : zjddjt

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 04/10/2019 16:10:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opid` varchar(50) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `phon` varchar(20) DEFAULT NULL,
  `addr` varchar(200) DEFAULT NULL,
  `apdt` bigint(11) DEFAULT NULL,
  `stat` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply
-- ----------------------------
BEGIN;
INSERT INTO `apply` VALUES (1, 'wfaw1212', 'a', '121232323', 'afewaef', 20190101130302, 1);
INSERT INTO `apply` VALUES (5, '236f13a40693f48434e788411b9', 'aaa', NULL, 'ee', 20191004034653, NULL);
INSERT INTO `apply` VALUES (6, '236f13a40693f48434e788411b9', 'aaa', NULL, 'c', 20191004035835, NULL);
INSERT INTO `apply` VALUES (7, '236f13a40693f48434e788411b9', 'aaa', NULL, 'ee', 20191004040132, NULL);
INSERT INTO `apply` VALUES (8, '236f13a40693f48434e788411b9', 'we', NULL, 'wef', 20191004040313, NULL);
INSERT INTO `apply` VALUES (9, '236f13a40693f48434e788411b9', 'awe', NULL, 'wef', 20191004040611, NULL);
INSERT INTO `apply` VALUES (10, '236f13a40693f48434e788411b9', 'wefww', NULL, 'wew', 20191004040645, NULL);
INSERT INTO `apply` VALUES (11, '236f13a40693f48434e788411b9', 'ef', NULL, 'eewe', 20191004040712, NULL);
INSERT INTO `apply` VALUES (12, '236f13a40693f48434e788411b9', 'we', NULL, 'aa', 20191004040840, NULL);
COMMIT;

-- ----------------------------
-- Procedure structure for PROC_APPLY_ADD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_APPLY_ADD`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_APPLY_ADD`(IN `data` varchar(20000))
BEGIN
	DECLARE apdt BIGINT UNSIGNED;
	DECLARE name varchar(50) default null;
  DECLARE phon varchar(20) default null;
  DECLARE addr varchar(200) default null;
	DECLARE opid varchar(50) default null;

	set apdt  = CONVERT(JSON_EXTRACT(data, '$.apdt'),UNSIGNED);
  set name  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
	set phon  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.phon'));
	set addr  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.addr'));
	set opid  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.opid'));
	
	insert into apply(`name`,`phon`,`addr`,`opid`,`apdt`) values(name,phon,addr,opid,apdt);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
