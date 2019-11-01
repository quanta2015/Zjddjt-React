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

 Date: 13/10/2019 22:22:58
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply
-- ----------------------------
BEGIN;
INSERT INTO `apply` VALUES (22, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '老大姐', '13982883328', '曙光嘉园嘉乐苑1幢1单元', 20191005114141, 1);
INSERT INTO `apply` VALUES (23, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '张大沟', '13988477573', '兴和公寓15幢4单元', 20191005120644, -1);
INSERT INTO `apply` VALUES (28, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '王武', '13774663432', '采荷路47号4幢1单元', 20191005100319, 1);
INSERT INTO `apply` VALUES (29, 'oMQQY1HIEcLlk0_fC81KaDiys79s', 'we', 'www', 'aaaa', 20191007102944, 0);
INSERT INTO `apply` VALUES (32, '236f13a40693f48434e788411b9', '李阳', '13515814446', '文二路毛家桥公寓7-802', 20191011030831, 2);
INSERT INTO `apply` VALUES (33, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '李玉刚', '13518474773', '文二路毛家桥公寓5-875', 20191011031114, -1);
INSERT INTO `apply` VALUES (34, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '李阳', '1368267667', 'seemingly', 20191011033130, 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of brand
-- ----------------------------
BEGIN;
INSERT INTO `brand` VALUES (1, '东南电梯股份有限公司浙江分公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114230_42597.jpg', '唐中华', '0571-87181113 18157187618', '一体机 井道加电梯', 0);
INSERT INTO `brand` VALUES (2, '杭州西奥电梯有限公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114230_83038.jpg', '范巨象', '13616508697', '一体机 井道加电梯', 0);
INSERT INTO `brand` VALUES (3, '奥的斯机电电梯有限公司', 'http://www.zjddjt.com//kindeditor/attached/image/20190923/20190923114229_50942.jpg', '戚洪亮', '13958065148', '井道加电梯', 0);
INSERT INTO `brand` VALUES (4, '日立电梯（中国）有限公司杭州工程有限公司', NULL, '吴伟力', '15968877116', '井道加电梯 一体机', 0);
INSERT INTO `brand` VALUES (5, '郎格尔电梯有限公司', 'http://www.lgeer.com/templates/cn/images/logo.jpg', '陈亮', '13777800553', '井道加电梯', 0);
INSERT INTO `brand` VALUES (37, '品牌2o', NULL, '测试', '测试', '井道加电梯 一体机 品牌机', 0);
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
  `contact` varchar(32) DEFAULT NULL COMMENT '联系人姓名',
  `phone` varchar(32) DEFAULT NULL COMMENT '联系人电话/手机',
  `apdt` bigint(11) DEFAULT NULL COMMENT '提交日期',
  `stat` int(11) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coop
-- ----------------------------
BEGIN;
INSERT INTO `coop` VALUES (16, '236f13a40693f48434e788411b9', '测试单位', '加梯服务', '合作内容#……@&*！（￥）123490·。；‘，。~ ’', '小胡', '1343214231', 20191009082140, 0);
INSERT INTO `coop` VALUES (17, '236f13a40693f4843', '测试单位2', '特务推广', '合作内容#……@&*！（￥）123490·。；‘，。~ ’', '小胡', '1343214231', 20191009082141, 0);
INSERT INTO `coop` VALUES (18, '236f13a40693f4844321541', '仓前XX小区', '加梯服务', '合作内容#……@&*！（￥）123490·。；‘，。~ ’', '小胡', '1366214432', 20191010082141, 0);
INSERT INTO `coop` VALUES (19, '236f13a40693f4844321424', '仓前XXX广告公司', '特务推广', '长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本,长文本', '小胡', '1366214432', 20191011082141, 0);
INSERT INTO `coop` VALUES (20, '236f13a40693f48434e788411b9', 'rewq', '加梯服务', 'fdsfdsafdsfdsfdsaf', '小虎', '432143214321', 20191011100757, 0);
COMMIT;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of files
-- ----------------------------
BEGIN;
INSERT INTO `files` VALUES (7, 22, '东都加梯项目介绍资料册.docx', 'upload/upload_6119c5e3203899de34f017bdfb56e6ab.docx');
INSERT INTO `files` VALUES (9, 23, '东都加梯项目介绍资料册.docx', 'upload/upload_ac83340cda8f843b408b4cf4acca9d40.docx');
INSERT INTO `files` VALUES (11, 33, '杭州师范大学财务信息门户.pdf', 'upload/upload_f07c498825b695f544d5bc121ff18ffe.pdf');
INSERT INTO `files` VALUES (12, 33, '666.jpg', 'upload/upload_538c9aaa03f92e708c5c53c25d5dfb44.jpg');
INSERT INTO `files` VALUES (13, 22, '单词导入模板.csv', 'upload/upload_6e1f1f8a96906787e796777dc170e765.csv');
INSERT INTO `files` VALUES (16, 32, '东都加梯项目介绍资料册.docx', 'upload/upload_6fce46d3a999a776cd136b421eb16498.docx');
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
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proc
-- ----------------------------
BEGIN;
INSERT INTO `proc` VALUES (37, 23, 20191007125723, 1, 1);
INSERT INTO `proc` VALUES (38, 23, 20191007125723, 2, 0);
INSERT INTO `proc` VALUES (39, 22, 20191007125829, 1, 1);
INSERT INTO `proc` VALUES (40, 22, 20191007125829, 2, 1);
INSERT INTO `proc` VALUES (123, 22, 20191009100559, 3, 0);
INSERT INTO `proc` VALUES (153, 28, 20191010115504, 1, 1);
INSERT INTO `proc` VALUES (154, 28, 20191010115504, 2, 0);
INSERT INTO `proc` VALUES (157, 33, 20191011031344, 1, 1);
INSERT INTO `proc` VALUES (158, 33, 20191011031344, 2, 1);
INSERT INTO `proc` VALUES (160, 33, 20191011031520, 3, 1);
INSERT INTO `proc` VALUES (161, 33, 20191011031543, 4, 1);
INSERT INTO `proc` VALUES (162, 33, 20191011031552, 5, 1);
INSERT INTO `proc` VALUES (163, 33, 20191011031555, 6, 1);
INSERT INTO `proc` VALUES (164, 33, 20191011031557, 7, 0);
INSERT INTO `proc` VALUES (165, 34, 20191011044818, 1, 1);
INSERT INTO `proc` VALUES (166, 34, 20191011044818, 2, 1);
INSERT INTO `proc` VALUES (167, 32, 20191013093252, 1, 1);
INSERT INTO `proc` VALUES (168, 32, 20191013093252, 2, 1);
INSERT INTO `proc` VALUES (171, 32, 20191013095709, 3, 1);
INSERT INTO `proc` VALUES (173, 32, 20191013104706, 4, 1);
INSERT INTO `proc` VALUES (176, 32, 20191013104716, 5, 1);
INSERT INTO `proc` VALUES (177, 32, 20191013104717, 6, 1);
INSERT INTO `proc` VALUES (178, 32, 20191013104719, 7, 1);
INSERT INTO `proc` VALUES (179, 34, 20191013101155, 3, 0);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (3, 'PMQQY1HIEcLlk0_fC81KaDiys79s', '慢清尘', 1, '杭州', '浙江', '中国', 'http://thirdwx.qlogo.cn/mmopen/O2Kpm8FD9tBIwh2XXenufvNWqo2PsUpBI55KvuB8nGDGKicD1bWy68JRvzXkwOCgOjehialmbuypVSJs4q4vbyau2g0U9w5Plc/132', 20191007125602);
INSERT INTO `user` VALUES (9, 'oMQQY1HIEcLlk0_fC81KaDiys79s', '慢清尘', 1, '杭州', '浙江', '中国', 'http://thirdwx.qlogo.cn/mmopen/O2Kpm8FD9tBIwh2XXenufvNWqo2PsUpBI55KvuB8nGDGKicD1bWy68JRvzXkwOCgOjehialmbuypVSJs4q4vbyau2g0U9w5Plc/132', 20191010115504);
INSERT INTO `user` VALUES (10, '236f13a40693f48434e788411b9', NULL, NULL, NULL, NULL, NULL, NULL, 20191011031344);
COMMIT;

-- ----------------------------
-- View structure for view_apply
-- ----------------------------
DROP VIEW IF EXISTS `view_apply`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_apply` AS select `apply`.`id` AS `key`,`apply`.`stat` AS `stat`,(case `apply`.`stat` when 0 then '申请中' when 1 then '已审查' when 2 then '已竣工' when -(1) then '已终止' else '进行中' end) AS `stat_name`,`apply`.`apdt` AS `apdt`,concat(substr(`apply`.`apdt`,1,4),'-',substr(`apply`.`apdt`,5,2),'-',substr(`apply`.`apdt`,7,2),' ',substr(`apply`.`apdt`,9,2),':',substr(`apply`.`apdt`,11,2),':',substr(`apply`.`apdt`,13,2)) AS `apdt_name`,`apply`.`opid` AS `opid`,`apply`.`name` AS `name`,`apply`.`phon` AS `phon`,`apply`.`addr` AS `addr` from `apply`;

-- ----------------------------
-- View structure for view_files
-- ----------------------------
DROP VIEW IF EXISTS `view_files`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_files` AS select `f`.`pid` AS `pid`,group_concat(`f`.`name` separator ',') AS `name_list`,group_concat(`f`.`url` separator ',') AS `url_list` from `files` `f` group by `f`.`pid`;

-- ----------------------------
-- View structure for view_proc
-- ----------------------------
DROP VIEW IF EXISTS `view_proc`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_proc` AS select `t`.`pid` AS `pid`,group_concat(`t`.`proc_dt` order by `t`.`proc_dt` ASC separator ',') AS `dt_list`,group_concat(`t`.`proc_ct` order by `t`.`proc_ct` ASC separator ',') AS `ct_list`,group_concat(`t`.`proc_stat` order by `t`.`proc_stat` DESC separator ',') AS `stat_list` from (select `p`.`id` AS `id`,`p`.`pid` AS `pid`,`p`.`proc_dt` AS `proc_dt`,`p`.`proc_ct` AS `proc_ct`,`p`.`proc_stat` AS `proc_stat` from `zjddjt`.`proc` `p` order by `p`.`pid`,`p`.`proc_ct`) `t` group by `t`.`pid`;

-- ----------------------------
-- Procedure structure for DEBUG_MSG
-- ----------------------------
DROP PROCEDURE IF EXISTS `DEBUG_MSG`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`DEBUG_MSG`(msg VARCHAR(21812))
BEGIN
    select concat("** ", msg) AS '** DEBUG:';
END
;;
delimiter ;

-- ----------------------------
-- Function structure for FN_USER_EXIST
-- ----------------------------
DROP FUNCTION IF EXISTS `FN_USER_EXIST`;
delimiter ;;
CREATE FUNCTION `zjddjt`.`FN_USER_EXIST`(`params` varchar(50))
 RETURNS int(11)
BEGIN
	DECLARE count BIGINT UNSIGNED ;
	
	select count(opid) into count from user where opid = params;
	return count;
END
;;
delimiter ;

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
		DECLARE tmp       BIGINT UNSIGNED;
		
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
		
		set tmp = FN_USER_EXIST(opid);
    if tmp = 0 then -- 若用户已经存在 则不添加
			insert into user(`opid`,`nickname`,`sex`,`city`,`province`,`country`,`headimgurl`,`reg_time`) 
		  values(opid,nickname,sex,city,province,country,headimgurl,proc_dt);
		end if;
		
		call PROC_APPLY_LIST(0);
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
  elseif (type=1) then
	  SELECT `stat_name` as `状态`,`apdt_name` as `申请日期`,`name` as `申请人`,`phon` as `手机号码`,`addr` as `加梯地址` FROM view_apply;
	elseif (type=2) then
	  SELECT `key`,`opid`,`addr`,`apdt`,`stat`,`stat_name` FROM view_apply where stat<>0 order by apdt ;
	else 
	  SELECT `apdt_name` as `申请日期`,`addr` as `项目名称`,`stat_name` as `状态` FROM view_apply where stat<>0 order by apdt ;
	end if;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_APPLY_LIST_BY_CODE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_APPLY_LIST_BY_CODE`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_APPLY_LIST_BY_CODE`(IN `data` varchar(100))
BEGIN
		DECLARE _opid varchar(50) default null;

    set _opid  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.code'));
		select * from `apply` a left join `view_files` f on a.`id` = f.`pid` 
	  where a.`opid` = _opid
		order by a.`apdt` desc;
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
		DECLARE opid varchar(50) default null;
		DECLARE type varchar(50) default null;
		DECLARE des varchar(255) default null;
		DECLARE contact varchar(255) default null;

		set apdt  = CONVERT(JSON_EXTRACT(data, '$.apdt'),UNSIGNED);
    set name  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
		set phone  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.phone'));
		set opid  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.opid'));
		set type  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'));
		set des  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.des'));
		set contact  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.contact'));
		
		insert into coop(`name`,`phone`,`opid`,`apdt`,`stat`,`type`,`des`,`contact`) values(name,phone,opid,apdt,0,type,des,contact);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_COOP_LIST
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_COOP_LIST`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_COOP_LIST`(IN `_type` int)
BEGIN
	if (_type=0) then
	  SELECT * FROM coop order by apdt;
  elseif (_type=1) then
	  SELECT 
			`name` as `合作对象`,
			`type` as `合作类型`,
			`des` as `主要描述`,
			`contact` as `联系人`,
			`phone` as `联系人电话`,
			`apdt` as `提交日期`
		FROM coop;
	end if;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_CANCEL
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_CANCEL`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_CANCEL`(IN `data` VARCHAR ( 1000 ))
BEGIN
    DECLARE cid       BIGINT UNSIGNED;
    DECLARE _pid       BIGINT UNSIGNED;
		DECLARE _proc_ct   BIGINT UNSIGNED;
		DECLARE _proc_dt   varchar(50) default null;
		
		set cid       = CONVERT(JSON_EXTRACT(data, '$.id'),UNSIGNED);
		set _pid       = CONVERT(JSON_EXTRACT(data, '$.pid'),UNSIGNED);
		set _proc_ct   = CONVERT(JSON_EXTRACT(data, '$.proc_ct'),UNSIGNED);
		set _proc_dt   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.proc_dt'));
		
		
		
	  delete from proc where id = cid;
		update proc set proc_stat=0 where proc_ct= _proc_ct-1 and pid=_pid;
		
		call proc_sche_detail(_pid);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_DELETE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_DELETE`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_DELETE`(IN `data` VARCHAR (1000))
BEGIN
    DECLARE _id    BIGINT UNSIGNED;
		DECLARE _pid   BIGINT UNSIGNED;
		set _id   = CONVERT(JSON_EXTRACT(data, '$.id'),UNSIGNED);
		set _pid  = CONVERT(JSON_EXTRACT(data,'$.pid'),UNSIGNED);
    
	  delete from files   where `id`  = _id;
		select * from files where `pid` = _pid;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_DETAIL
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_DETAIL`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_DETAIL`(IN `params` int)
BEGIN
	  SELECT p.`id` as `key`,`pid`,`proc_dt`,
		`proc_ct`,
		n.`name` as `proc_ct_name`,
		if((`proc_stat` = 0),'执行中','已完成') AS `proc_stat`
    FROM proc p 
		left join proc_name n 
		on p.`proc_ct`=n.`id` 
		where p.`pid`=params order by p.`id`;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_FILE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_FILE`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_FILE`(IN `params` int)
BEGIN
		select * from files where `pid` = params;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_FINISH
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_FINISH`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_FINISH`(IN `data` VARCHAR ( 1000 ))
BEGIN
    DECLARE cid       BIGINT UNSIGNED;
    DECLARE pid       BIGINT UNSIGNED;
		DECLARE proc_ct   BIGINT UNSIGNED;
		DECLARE proc_dt   varchar(50) default null;
		
		set cid       = CONVERT(JSON_EXTRACT(data, '$.id'),UNSIGNED);
		set pid       = CONVERT(JSON_EXTRACT(data, '$.pid'),UNSIGNED);
		set proc_ct   = CONVERT(JSON_EXTRACT(data, '$.proc_ct'),UNSIGNED);
		set proc_dt   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.proc_dt'));
		
	  update proc set proc_stat=1 where id = cid;
		
		if (proc_ct!=7) then  -- 7『竣工验收和使用登记』：结束状态
		  insert into proc(`pid`,`proc_dt`,`proc_ct`,`proc_stat`) values(pid,proc_dt,proc_ct + 1,0);
	  else
		  update apply set stat = 2 where id = pid;
		end if;
		
		call proc_sche_detail(pid);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_LIST
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_LIST`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_LIST`(IN `data` varchar(100))
BEGIN
		DECLARE _opid varchar(50) default null;

    set _opid  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.code'));
		select * from `apply` a left join `view_proc` f on a.`id` = f.`pid` 
	  where a.`opid` = _opid
		order by a.`apdt` desc;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_STOP
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_STOP`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_STOP`(IN `data` VARCHAR ( 1000 ))
BEGIN
    DECLARE pid BIGINT UNSIGNED;
		set pid  = CONVERT(JSON_EXTRACT(data, '$.key'),UNSIGNED);
		
		update apply set stat=-1 where `id` = pid;
		call PROC_APPLY_LIST(2);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SCHE_UPLOAD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SCHE_UPLOAD`;
delimiter ;;
CREATE PROCEDURE `zjddjt`.`PROC_SCHE_UPLOAD`(IN `data` VARCHAR ( 1000 ))
BEGIN
    DECLARE id     BIGINT UNSIGNED;
		DECLARE _file   varchar(200) default null;
		DECLARE _name   varchar(200) default null;
		
		set id   = CONVERT(JSON_EXTRACT(data, '$.id'),UNSIGNED);
		set _file = JSON_UNQUOTE(JSON_EXTRACT(data,'$.file'));
		set _name = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
		
	  insert into files(`pid`,`name`,`url`) values(id,_name,_file);
		
		select * from files where `pid` = id;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
