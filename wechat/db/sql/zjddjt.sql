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

 Date: 07/10/2019 21:34:05
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply
-- ----------------------------
BEGIN;
INSERT INTO `apply` VALUES (22, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '老大姐', '13982883328', '曙光嘉园嘉乐苑1幢1单元', 20191005114141, 1);
INSERT INTO `apply` VALUES (23, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '张大沟', '13988477573', '兴和公寓15幢4单元', 20191005120644, 1);
INSERT INTO `apply` VALUES (28, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '王武', '13774663432', '采荷路47号4幢1单元', 20191005100319, 0);
INSERT INTO `apply` VALUES (29, 'oMQQY1HIEcLlk0_fC81KaDiys79s', 'we', 'www', 'aaaa', 20191007102944, 0);
COMMIT;

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
  `stat` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of brand
-- ----------------------------
BEGIN;
INSERT INTO `brand` VALUES (2, '杭州西奥电梯有限公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114230_83038.jpg', '范巨象', '13616508697', '一体机 井道加电梯', 0);
INSERT INTO `brand` VALUES (3, '奥的斯机电电梯有限公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114229_50942.jpg', '戚洪亮', '13958065148', '井道加电梯', 0);
INSERT INTO `brand` VALUES (4, '日立电梯（中国）有限公司杭州工程有限公司', 'http://www.hitachi-helc.com/Source/home/images/headlogo.png', '吴伟力', '15968877116', '井道加电梯', 0);
COMMIT;

-- ----------------------------
-- Table structure for coop
-- ----------------------------
DROP TABLE IF EXISTS `coop`;
CREATE TABLE `coop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opid` varchar(64) NOT NULL COMMENT '合作对象微信openid',
  `name` varchar(64) DEFAULT NULL COMMENT '合作对象',
  `type` varchar(64) DEFAULT NULL COMMENT '合作类型',
  `des` varchar(255) DEFAULT NULL COMMENT '主要描述',
  `addr` varchar(255) DEFAULT NULL COMMENT '单位地址',
  `contact` varchar(32) DEFAULT NULL COMMENT '联系人姓名',
  `phone` varchar(32) DEFAULT NULL COMMENT '联系人电话/手机',
  `apdt` bigint(11) DEFAULT NULL COMMENT '提交日期',
  `stat` int(11) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coop
-- ----------------------------
BEGIN;
INSERT INTO `coop` VALUES (13, '236f13a40693f48434e788411b9', '希望小区', '特务推广', '小区预期加装五部电梯，希望和贵单位合作', '杭州市余杭区余杭塘路希望小区', '小胡', '123456778', 20191005080556, 0);
INSERT INTO `coop` VALUES (14, '236f13a40693f48434e788411b9', 'wef', '加梯材料', 'wef', 'wef', 'wef', '13515814446', 20191005081819, 0);
COMMIT;

-- ----------------------------
-- Table structure for proc
-- ----------------------------
DROP TABLE IF EXISTS `proc`;
CREATE TABLE `proc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `proc_dt` bigint(20) DEFAULT NULL,
  `proc_ct` int(11) DEFAULT NULL,
  `proc_stat` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proc
-- ----------------------------
BEGIN;
INSERT INTO `proc` VALUES (37, 23, 20191007125723, 1, 1);
INSERT INTO `proc` VALUES (38, 23, 20191007125723, 2, 0);
INSERT INTO `proc` VALUES (39, 22, 20191007125829, 1, 1);
INSERT INTO `proc` VALUES (40, 22, 20191007125829, 2, 0);
COMMIT;

-- ----------------------------
-- Table structure for proc_name
-- ----------------------------
DROP TABLE IF EXISTS `proc_name`;
CREATE TABLE `proc_name` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proc_name
-- ----------------------------
BEGIN;
INSERT INTO `proc_name` VALUES (1, '受理申请并确定申请人和实施主体');
INSERT INTO `proc_name` VALUES (2, '现场勘测和制定可行性方案');
INSERT INTO `proc_name` VALUES (3, '协议公示(业主协议、资金费用、电梯保养)');
INSERT INTO `proc_name` VALUES (4, '委托施工图审并备案');
INSERT INTO `proc_name` VALUES (5, '政府组织联合审查');
INSERT INTO `proc_name` VALUES (6, '施工单位实施加装作业');
INSERT INTO `proc_name` VALUES (7, '竣工验收和使用登记');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opid` varchar(50) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `sex` int(255) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `reg_time` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (3, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '慢清尘', 1, '杭州', '浙江', '中国', 'http://thirdwx.qlogo.cn/mmopen/O2Kpm8FD9tBIwh2XXenufvNWqo2PsUpBI55KvuB8nGDGKicD1bWy68JRvzXkwOCgOjehialmbuypVSJs4q4vbyau2g0U9w5Plc/132', 20191007125602);
INSERT INTO `user` VALUES (5, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '慢清尘', 1, '杭州', '浙江', '中国', 'http://thirdwx.qlogo.cn/mmopen/O2Kpm8FD9tBIwh2XXenufvNWqo2PsUpBI55KvuB8nGDGKicD1bWy68JRvzXkwOCgOjehialmbuypVSJs4q4vbyau2g0U9w5Plc/132', 20191007125829);
COMMIT;

-- ----------------------------
-- View structure for view_apply
-- ----------------------------
DROP VIEW IF EXISTS `view_apply`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_apply` AS select `apply`.`id` AS `key`,`apply`.`stat` AS `stat`,if((`apply`.`stat` = 0),'申请中','已审查') AS `stat_name`,`apply`.`apdt` AS `apdt`,concat(substr(`apply`.`apdt`,1,4),'-',substr(`apply`.`apdt`,5,2),'-',substr(`apply`.`apdt`,7,2),' ',substr(`apply`.`apdt`,9,2),':',substr(`apply`.`apdt`,11,2),':',substr(`apply`.`apdt`,13,2)) AS `apdt_name`,`apply`.`opid` AS `opid`,`apply`.`name` AS `name`,`apply`.`phon` AS `phon`,`apply`.`addr` AS `addr` from `apply`;

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

		insert into apply(`name`,`phon`,`addr`,`opid`,`apdt`,`stat`) values(name,phon,addr,opid,apdt,0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_APPLY_AGREE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_APPLY_AGREE`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_APPLY_AGREE`(IN `data` varchar(20000))
BEGIN
		DECLARE pid       BIGINT UNSIGNED;
		DECLARE proc_dt   BIGINT UNSIGNED;
		DECLARE proc_ct_1 BIGINT UNSIGNED;
		DECLARE proc_ct_2 BIGINT UNSIGNED;

		DECLARE opid     varchar(50) default null;
		DECLARE nickname varchar(50) default null;
		DECLARE sex      BIGINT UNSIGNED;
		DECLARE city     varchar(20) default null;
		DECLARE province varchar(20) default null;
		DECLARE country  varchar(20) default null;
		DECLARE headimgurl  varchar(255) default null;

		set pid     = CONVERT(JSON_EXTRACT(data, '$.key'),    UNSIGNED);
		set proc_dt = CONVERT(JSON_EXTRACT(data, '$.proc_dt'),UNSIGNED);
		set proc_ct_1 = 1; -- 1: 确定申请人
		set proc_ct_2 = 2; -- 2: 现场勘测和制定可行性方案

		set opid      = JSON_UNQUOTE(JSON_EXTRACT(data,'$.opid'));
		set nickname  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.nickname'));
		set sex       = CONVERT(JSON_EXTRACT(data, '$.sex'), UNSIGNED);
		set city      = JSON_UNQUOTE(JSON_EXTRACT(data,'$.city'));
		set province  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.province'));
		set country   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.country'));
		set headimgurl= JSON_UNQUOTE(JSON_EXTRACT(data,'$.headimgurl'));

		insert into proc(`pid`,`proc_dt`,`proc_ct`,`proc_stat`) values(pid,proc_dt,proc_ct_1,1);
		insert into proc(`pid`,`proc_dt`,`proc_ct`,`proc_stat`) values(pid,proc_dt,proc_ct_2,0);
		update apply set `stat`=1 where `id` = pid;
		insert into user(`opid`,`nickname`,`sex`,`city`,`province`,`country`,`headimgurl`,`reg_time`)
		  values(opid,nickname,sex,city,province,country,headimgurl,proc_dt);

		call PROC_APPLY_LIST(data);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_APPLY_LIST
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_APPLY_LIST`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_APPLY_LIST`(IN `type` int)
BEGIN
  if (type=0) then
	  SELECT `key`,`opid`,`phon`,`name`,`addr`,`apdt`,`stat`,`stat_name` FROM view_apply order by apdt;
  else
	  SELECT `stat_name` as `状态`,`apdt_name` as `申请日期`,`name` as `申请人`,`phon` as `手机号码`,`addr` as `加梯地址` FROM view_apply;
	end if;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_BRAND_ADD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_BRAND_ADD`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_BRAND_ADD`(IN `data` VARCHAR ( 20000 ))
BEGIN
	DECLARE name varchar(64) default null;
	DECLARE icon varchar(255) default null;
	DECLARE contact varchar(255) default null;
  DECLARE phone varchar(32) default null;
  DECLARE type varchar(255) default null;

  SET name  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
  SET icon  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.icon'));
	SET contact  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.contact'));
	SET phone  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.phone'));
	SET type  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'));

	INSERT INTO
		brand(`name`,`icon`,`contact`,`phone`,`type`, `stat`)
	values
		(name,icon,contact,phone,type, 0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_BRAND_DELETE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_BRAND_DELETE`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_BRAND_DELETE`(IN `data` varchar(20000))
BEGIN
  DECLARE id int(11) default null;

	SET id  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.id'));

	DELETE FROM brand WHERE brand.id=id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_BRAND_UPDATE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_BRAND_UPDATE`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_BRAND_UPDATE`(IN `data` VARCHAR ( 20000 ))
BEGIN
	DECLARE id int(11);
	DECLARE name varchar(64) default null;
	DECLARE icon varchar(255) default null;
	DECLARE contact varchar(255) default null;
  DECLARE phone varchar(32) default null;
  DECLARE type varchar(255) default null;

  SET id  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.id'));
--   SET name  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
--   SET icon  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.icon'));
-- 	SET contact  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.contact'));
-- 	SET phone  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.phone'));
-- 	SET type  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'));

	UPDATE
		brand
	SET
    name  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name')),
		icon  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.icon')),
		contact  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.contact')),
		phone  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.phone')),
		type  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'))
	WHERE
    brand.id=id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_COOP_ADD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_COOP_ADD`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_COOP_ADD`(IN `data` varchar(20000))
BEGIN
		DECLARE apdt BIGINT UNSIGNED;
		DECLARE name varchar(50) default null;
    DECLARE phone varchar(20) default null;
    DECLARE addr varchar(200) default null;
		DECLARE opid varchar(50) default null;
		DECLARE type varchar(50) default null;
		DECLARE des varchar(255) default null;
		DECLARE contact varchar(255) default null;

		set apdt  = CONVERT(JSON_EXTRACT(data, '$.apdt'),UNSIGNED);
    set name  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
		set phone  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.phone'));
		set addr  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.addr'));
		set opid  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.opid'));
		set type  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'));
		set des  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.des'));
		set contact  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.contact'));

		insert into coop(`name`,`phone`,`addr`,`opid`,`apdt`,`stat`,`type`,`des`,`contact`) values(name,phone,addr,opid,apdt,0,type,des,contact);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
