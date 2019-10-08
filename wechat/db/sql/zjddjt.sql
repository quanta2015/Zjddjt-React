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

-- ----------------------------
-- Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '企业名',
  `icon` varchar(255) DEFAULT NULL COMMENT '商标图片url',
  `contact` varchar(32) DEFAULT NULL COMMENT '联系人',
  `phone` varchar(128) DEFAULT NULL COMMENT '联系人电话',
  `type` varchar(255) DEFAULT NULL COMMENT '可提供电梯类别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of brand
-- ----------------------------
BEGIN;
INSERT INTO `brand` VALUES (1, '东南电梯股份有限公司浙江分公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114230_42597.jpg', '唐中华', '0571-87181113 18157187618', '一体机 井道加电梯',0);
INSERT INTO `brand` VALUES (2, '杭州西奥电梯有限公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114230_83038.jpg', '范巨象', '13616508697', '一体机 井道加电梯',0);
INSERT INTO `brand` VALUES (3, '奥的斯机电电梯有限公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114229_50942.jpg', '戚洪亮', '13958065148', '井道加电梯',0);
INSERT INTO `brand` VALUES (4, '日立电梯（中国）有限公司杭州工程有限公司', 'http://www.hitachi-helc.com/Source/home/images/headlogo.png', '吴伟力', '15968877116', '井道加电梯',0);
INSERT INTO `brand` VALUES (5, '郎格尔电梯有限公司', 'http://www.lgeer.com/templates/cn/images/logo.jpg', '陈亮', '13777800553', '井道加电梯',0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
