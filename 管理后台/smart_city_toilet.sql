/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : smart_city_toilet

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-04-03 17:44:10
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `administrator_table`
-- ----------------------------
DROP TABLE IF EXISTS `administrator_table`;
CREATE TABLE `administrator_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of administrator_table
-- ----------------------------
INSERT INTO `administrator_table` VALUES ('1', '123456', '123456', '呵呵');
INSERT INTO `administrator_table` VALUES ('2', 'admin', 'admin', '老板');

-- ----------------------------
-- Table structure for `evaluate_table`
-- ----------------------------
DROP TABLE IF EXISTS `evaluate_table`;
CREATE TABLE `evaluate_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `HealthStar` text CHARACTER SET utf8,
  `time` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `evaluate` text CHARACTER SET utf8,
  `nameID` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `headphoto` text CHARACTER SET utf8,
  `site` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `SN` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of evaluate_table
-- ----------------------------
INSERT INTO `evaluate_table` VALUES ('42', '心', '{\"气味\":3,\"卫生\":4,\"其他\":1}', '2019/01/30 21:48:38', '测试', 'undefined', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVaFys7vChSI6WiboMhb0PShcQ/132', '加入', '厕所', '62858');
INSERT INTO `evaluate_table` VALUES ('43', '心', '{\"气味\":2,\"卫生\":3,\"其他\":4}', '2019/01/30 21:53:18', '再来一次', 'undefined', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVaFys7vChSI6WiboMhb0PShcQ/132', '加入', '厕所', '62858');
INSERT INTO `evaluate_table` VALUES ('44', '心', '{\"气味\":2,\"卫生\":3,\"其他\":4}', '2019/01/30 21:53:19', '再来一次', 'undefined', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVaFys7vChSI6WiboMhb0PShcQ/132', '加入', '厕所', '62858');
INSERT INTO `evaluate_table` VALUES ('45', '心', '{\"气味\":2,\"卫生\":3,\"其他\":4}', '2019/01/30 21:53:22', '再来一次', 'undefined', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVaFys7vChSI6WiboMhb0PShcQ/132', '加入', '厕所', '62858');
INSERT INTO `evaluate_table` VALUES ('46', '心', '{\"气味\":2,\"卫生\":3,\"其他\":4}', '2019/01/30 21:55:28', '完美', 'undefined', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVaFys7vChSI6WiboMhb0PShcQ/132', '加入', '厕所', '62858');
INSERT INTO `evaluate_table` VALUES ('47', '行云流水', '{\"气味\":5,\"卫生\":5,\"其他\":5}', '2019/02/26 20:52:10', '干净整洁', 'undefined', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIGzSM6be2xCOGVicwdwXjB4v6puPMiaic9F1W2FavMFDMKZ6q1C8gIGGe5AN7ic2TJtl0q0Haf5jq29A/132', '文化公园北侧', '文化公园旅游厕所', '2001812240057');
INSERT INTO `evaluate_table` VALUES ('48', '心', '{\"气味\":3,\"卫生\":2,\"其他\":4}', '2019/03/09 23:06:12', '测试', '5314189384555790162', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVayiaOPnQs3yUdiav7ah46T0sQ/132', '河北省廊坊市广阳区银河北路人民公园', '公共厕所', '2001812240064');

-- ----------------------------
-- Table structure for `extension_pit_table`
-- ----------------------------
DROP TABLE IF EXISTS `extension_pit_table`;
CREATE TABLE `extension_pit_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name_ID` varchar(30) DEFAULT NULL,
  `toiletDetails_ID` varchar(30) DEFAULT NULL,
  `pit_condition` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of extension_pit_table
-- ----------------------------
INSERT INTO `extension_pit_table` VALUES ('55', '2001810260309211', '20004', '0');
INSERT INTO `extension_pit_table` VALUES ('56', '2001810260309211', '20005', '0');
INSERT INTO `extension_pit_table` VALUES ('57', '2001810260309111', '10004', '1');
INSERT INTO `extension_pit_table` VALUES ('58', '2001810260309112', '10013', '0');
INSERT INTO `extension_pit_table` VALUES ('59', '2001810260309112', '10010', '0');
INSERT INTO `extension_pit_table` VALUES ('60', '2001810260309111', '10007', '1');
INSERT INTO `extension_pit_table` VALUES ('61', '2001810260309112', '10011', '0');
INSERT INTO `extension_pit_table` VALUES ('62', '2001812240057111', '10001', '0');
INSERT INTO `extension_pit_table` VALUES ('63', '2001812240057111', '10003', '0');
INSERT INTO `extension_pit_table` VALUES ('64', '2001812240057111', '10000', '1');
INSERT INTO `extension_pit_table` VALUES ('65', '2001812240057111', '10002', '1');
INSERT INTO `extension_pit_table` VALUES ('66', '2001812240057211', '20001', '0');
INSERT INTO `extension_pit_table` VALUES ('67', '2001812240057211', '20002', '0');
INSERT INTO `extension_pit_table` VALUES ('68', '2001812240057211', '20003', '0');
INSERT INTO `extension_pit_table` VALUES ('69', '2001812240057211', '20000', '0');
INSERT INTO `extension_pit_table` VALUES ('70', '2001812240125211', '20004', '0');
INSERT INTO `extension_pit_table` VALUES ('71', '2001812240125211', '20001', '0');
INSERT INTO `extension_pit_table` VALUES ('72', '2001812240125111', '10001', '0');
INSERT INTO `extension_pit_table` VALUES ('73', '2001812240125111', '10002', '0');
INSERT INTO `extension_pit_table` VALUES ('74', '2001812240125211', '20003', '0');
INSERT INTO `extension_pit_table` VALUES ('75', '2001812240125111', '10000', '0');
INSERT INTO `extension_pit_table` VALUES ('76', '2001812240125211', '20002', '1');
INSERT INTO `extension_pit_table` VALUES ('77', '2001812240125211', '20000', '0');
INSERT INTO `extension_pit_table` VALUES ('78', '2001812240064111', '10003', '1');
INSERT INTO `extension_pit_table` VALUES ('79', '2001812240064111', '10000', '0');
INSERT INTO `extension_pit_table` VALUES ('80', '2001812240064111', '10004', '1');
INSERT INTO `extension_pit_table` VALUES ('81', '2001812240064111', '10002', '1');
INSERT INTO `extension_pit_table` VALUES ('82', '2001812240064111', '10001', '0');
INSERT INTO `extension_pit_table` VALUES ('83', '2001812240064211', '20003', '0');
INSERT INTO `extension_pit_table` VALUES ('84', '2001812240064211', '20001', '0');
INSERT INTO `extension_pit_table` VALUES ('85', '2001812240064211', '20009', '0');
INSERT INTO `extension_pit_table` VALUES ('86', '2001812240064211', '20002', '0');
INSERT INTO `extension_pit_table` VALUES ('87', '2001812240064211', '20000', '1');
INSERT INTO `extension_pit_table` VALUES ('88', '2001812240064211', '20008', '0');
INSERT INTO `extension_pit_table` VALUES ('89', '2001812240064211', '20004', '0');
INSERT INTO `extension_pit_table` VALUES ('90', '2001812240064211', '20007', '0');
INSERT INTO `extension_pit_table` VALUES ('91', '2001812240088111', '10006', '0');
INSERT INTO `extension_pit_table` VALUES ('92', '2001812240088111', '10002', '0');
INSERT INTO `extension_pit_table` VALUES ('93', '2001812240088111', '10007', '0');
INSERT INTO `extension_pit_table` VALUES ('94', '2001812240088111', '10000', '0');
INSERT INTO `extension_pit_table` VALUES ('95', '2001812240088111', '10008', '1');
INSERT INTO `extension_pit_table` VALUES ('96', '2001812240088111', '10004', '0');
INSERT INTO `extension_pit_table` VALUES ('97', '2001812240088111', '10005', '0');
INSERT INTO `extension_pit_table` VALUES ('98', '2001812240088111', '10003', '0');
INSERT INTO `extension_pit_table` VALUES ('99', '2001812240088211', '200013', '0');
INSERT INTO `extension_pit_table` VALUES ('100', '2001812240088211', '20005', '0');
INSERT INTO `extension_pit_table` VALUES ('101', '2001812240088211', '20009', '0');
INSERT INTO `extension_pit_table` VALUES ('102', '2001812240088211', '20004', '0');
INSERT INTO `extension_pit_table` VALUES ('103', '2001812240088211', '200014', '0');
INSERT INTO `extension_pit_table` VALUES ('104', '2001812240088211', '200012', '0');
INSERT INTO `extension_pit_table` VALUES ('105', '2001812240088211', '200011', '0');
INSERT INTO `extension_pit_table` VALUES ('106', '2001812240088211', '20003', '0');
INSERT INTO `extension_pit_table` VALUES ('107', '2001812240088211', '20001', '0');
INSERT INTO `extension_pit_table` VALUES ('108', '2001812240088211', '20002', '0');
INSERT INTO `extension_pit_table` VALUES ('109', '2001812240088211', '200010', '0');
INSERT INTO `extension_pit_table` VALUES ('110', '2001812240088211', '20006', '0');
INSERT INTO `extension_pit_table` VALUES ('111', '2001812240040211', '20001', '0');
INSERT INTO `extension_pit_table` VALUES ('112', '2001812240040211', '200010', '0');
INSERT INTO `extension_pit_table` VALUES ('113', '2001812240040211', '200013', '0');
INSERT INTO `extension_pit_table` VALUES ('114', '2001812240040211', '20000', '0');
INSERT INTO `extension_pit_table` VALUES ('115', '2001812240040111', '10001', '0');
INSERT INTO `extension_pit_table` VALUES ('116', '2001812240040211', '200017', '0');
INSERT INTO `extension_pit_table` VALUES ('117', '2001812240040111', '10000', '0');
INSERT INTO `extension_pit_table` VALUES ('118', '2001812240040211', '200012', '0');
INSERT INTO `extension_pit_table` VALUES ('119', '2001812240040211', '200016', '0');
INSERT INTO `extension_pit_table` VALUES ('120', '2001812240040211', '20007', '0');
INSERT INTO `extension_pit_table` VALUES ('121', '2001812240040111', '10002', '0');
INSERT INTO `extension_pit_table` VALUES ('122', '2001812240040111', '10003', '0');
INSERT INTO `extension_pit_table` VALUES ('123', '2001812240040211', '200014', '0');
INSERT INTO `extension_pit_table` VALUES ('124', '2001812240040211', '200011', '0');
INSERT INTO `extension_pit_table` VALUES ('125', '2001812240040211', '20009', '0');
INSERT INTO `extension_pit_table` VALUES ('126', '2001812240040211', '20005', '0');
INSERT INTO `extension_pit_table` VALUES ('127', '2001812240040211', '20008', '0');
INSERT INTO `extension_pit_table` VALUES ('128', '2001812240040211', '200015', '0');
INSERT INTO `extension_pit_table` VALUES ('129', '2001812240040211', '20004', '0');
INSERT INTO `extension_pit_table` VALUES ('130', '2001812240040211', '20002', '0');
INSERT INTO `extension_pit_table` VALUES ('131', '2001812240040211', '20003', '0');
INSERT INTO `extension_pit_table` VALUES ('132', '2001812240040211', '20006', '0');

-- ----------------------------
-- Table structure for `extension_table`
-- ----------------------------
DROP TABLE IF EXISTS `extension_table`;
CREATE TABLE `extension_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name_ID` varchar(30) DEFAULT NULL,
  `NH3` varchar(10) DEFAULT NULL,
  `temperature` varchar(10) DEFAULT NULL,
  `humidity` varchar(10) DEFAULT NULL,
  `pit_id` varchar(30) DEFAULT NULL,
  `urinal_id` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=309 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of extension_table
-- ----------------------------
INSERT INTO `extension_table` VALUES ('157', '200181026030941', null, null, null, '2001810260309411', '2001810260309412');
INSERT INTO `extension_table` VALUES ('158', '200181026030931', null, null, null, '2001810260309311', '2001810260309312');
INSERT INTO `extension_table` VALUES ('159', '200181026030921', null, '23', '50', '2001810260309211', '2001810260309212');
INSERT INTO `extension_table` VALUES ('160', '200181026030911', '38', '23', '50', '2001810260309111', '2001810260309112');
INSERT INTO `extension_table` VALUES ('161', '264857646541', null, null, null, '2648576465411', '2648576465412');
INSERT INTO `extension_table` VALUES ('162', '264857646531', null, null, null, '2648576465311', '2648576465312');
INSERT INTO `extension_table` VALUES ('163', '264857646521', null, null, null, '2648576465211', '2648576465212');
INSERT INTO `extension_table` VALUES ('164', '264857646511', null, null, null, '2648576465111', '2648576465112');
INSERT INTO `extension_table` VALUES ('165', '524864572531', null, null, null, '5248645725311', '5248645725312');
INSERT INTO `extension_table` VALUES ('166', '524864572521', null, null, null, '5248645725211', '5248645725212');
INSERT INTO `extension_table` VALUES ('167', '524864572511', null, null, null, '5248645725111', '5248645725112');
INSERT INTO `extension_table` VALUES ('168', '524864572541', null, null, null, '5248645725411', '5248645725412');
INSERT INTO `extension_table` VALUES ('169', '3487569837241', null, null, null, '34875698372411', '34875698372412');
INSERT INTO `extension_table` VALUES ('170', '3487569837231', null, null, null, '34875698372311', '34875698372312');
INSERT INTO `extension_table` VALUES ('171', '3487569837221', null, null, null, '34875698372211', '34875698372212');
INSERT INTO `extension_table` VALUES ('172', '3487569837211', null, null, null, '34875698372111', '34875698372112');
INSERT INTO `extension_table` VALUES ('173', '5468341', null, null, null, '54683411', '54683412');
INSERT INTO `extension_table` VALUES ('174', '5468331', null, null, null, '54683311', '54683312');
INSERT INTO `extension_table` VALUES ('175', '5468321', null, null, null, '54683211', '54683212');
INSERT INTO `extension_table` VALUES ('176', '5468311', null, null, null, '54683111', '54683112');
INSERT INTO `extension_table` VALUES ('177', '347826411', null, null, null, '3478264111', '3478264112');
INSERT INTO `extension_table` VALUES ('178', '347826421', null, null, null, '3478264211', '3478264212');
INSERT INTO `extension_table` VALUES ('179', '347826431', null, null, null, '3478264311', '3478264312');
INSERT INTO `extension_table` VALUES ('180', '347826441', null, null, null, '3478264411', '3478264412');
INSERT INTO `extension_table` VALUES ('181', '43587634511', null, null, null, '435876345111', '435876345112');
INSERT INTO `extension_table` VALUES ('182', '43587634521', null, null, null, '435876345211', '435876345212');
INSERT INTO `extension_table` VALUES ('183', '43587634531', null, null, null, '435876345311', '435876345312');
INSERT INTO `extension_table` VALUES ('184', '43587634541', null, null, null, '435876345411', '435876345412');
INSERT INTO `extension_table` VALUES ('185', '1254698541', null, null, null, '12546985411', '12546985412');
INSERT INTO `extension_table` VALUES ('186', '1254698531', null, null, null, '12546985311', '12546985312');
INSERT INTO `extension_table` VALUES ('187', '1254698521', null, null, null, '12546985211', '12546985212');
INSERT INTO `extension_table` VALUES ('188', '1254698511', null, null, null, '12546985111', '12546985112');
INSERT INTO `extension_table` VALUES ('189', '1234541', null, null, null, '12345411', '12345412');
INSERT INTO `extension_table` VALUES ('190', '1234531', null, null, null, '12345311', '12345312');
INSERT INTO `extension_table` VALUES ('191', '1234521', null, null, null, '12345211', '12345212');
INSERT INTO `extension_table` VALUES ('192', '1234511', null, null, null, '12345111', '12345112');
INSERT INTO `extension_table` VALUES ('193', '254684741', null, null, null, '2546847411', '2546847412');
INSERT INTO `extension_table` VALUES ('194', '254684731', null, null, null, '2546847311', '2546847312');
INSERT INTO `extension_table` VALUES ('195', '254684721', null, null, null, '2546847211', '2546847212');
INSERT INTO `extension_table` VALUES ('196', '254684711', null, null, null, '2546847111', '2546847112');
INSERT INTO `extension_table` VALUES ('197', '1235764535441', null, null, null, '12357645354411', '12357645354412');
INSERT INTO `extension_table` VALUES ('198', '1235764535431', null, null, null, '12357645354311', '12357645354312');
INSERT INTO `extension_table` VALUES ('199', '1235764535421', null, null, null, '12357645354211', '12357645354212');
INSERT INTO `extension_table` VALUES ('200', '1235764535411', null, null, null, '12357645354111', '12357645354112');
INSERT INTO `extension_table` VALUES ('201', '2546859462531', null, null, null, '25468594625311', '25468594625312');
INSERT INTO `extension_table` VALUES ('202', '2546859462511', null, null, null, '25468594625111', '25468594625112');
INSERT INTO `extension_table` VALUES ('203', '2546859462521', null, null, null, '25468594625211', '25468594625212');
INSERT INTO `extension_table` VALUES ('204', '2546859462541', null, null, null, '25468594625411', '25468594625412');
INSERT INTO `extension_table` VALUES ('205', '6285831', null, null, null, '62858311', '62858312');
INSERT INTO `extension_table` VALUES ('206', '6285811', null, null, null, '62858111', '62858112');
INSERT INTO `extension_table` VALUES ('207', '6285821', null, null, null, '62858211', '62858212');
INSERT INTO `extension_table` VALUES ('208', '6285841', null, null, null, '62858411', '62858412');
INSERT INTO `extension_table` VALUES ('209', '12345611', null, null, null, '123456111', '123456112');
INSERT INTO `extension_table` VALUES ('210', '12345621', null, null, null, '123456211', '123456212');
INSERT INTO `extension_table` VALUES ('211', '12345631', null, null, null, '123456311', '123456312');
INSERT INTO `extension_table` VALUES ('212', '12345641', null, null, null, '123456411', '123456412');
INSERT INTO `extension_table` VALUES ('213', '200181224011811', null, null, null, '2001812240118111', '2001812240118112');
INSERT INTO `extension_table` VALUES ('214', '200181224011821', null, null, null, '2001812240118211', '2001812240118212');
INSERT INTO `extension_table` VALUES ('215', '200181224011831', null, null, null, '2001812240118311', '2001812240118312');
INSERT INTO `extension_table` VALUES ('216', '200181224011841', null, null, null, '2001812240118411', '2001812240118412');
INSERT INTO `extension_table` VALUES ('217', '24533614511', null, null, null, '245336145111', '245336145112');
INSERT INTO `extension_table` VALUES ('218', '24533614521', null, null, null, '245336145211', '245336145212');
INSERT INTO `extension_table` VALUES ('219', '24533614531', null, null, null, '245336145311', '245336145312');
INSERT INTO `extension_table` VALUES ('220', '24533614541', null, null, null, '245336145411', '245336145412');
INSERT INTO `extension_table` VALUES ('221', '64975311', null, null, null, '649753111', '649753112');
INSERT INTO `extension_table` VALUES ('222', '64975331', null, null, null, '649753311', '649753312');
INSERT INTO `extension_table` VALUES ('223', '64975321', null, null, null, '649753211', '649753212');
INSERT INTO `extension_table` VALUES ('224', '64975341', null, null, null, '649753411', '649753412');
INSERT INTO `extension_table` VALUES ('225', '200181224005721', null, null, null, '2001812240057211', '2001812240057212');
INSERT INTO `extension_table` VALUES ('226', '200181224005711', null, null, null, '2001812240057111', '2001812240057112');
INSERT INTO `extension_table` VALUES ('227', '200181224005731', null, null, null, '2001812240057311', '2001812240057312');
INSERT INTO `extension_table` VALUES ('228', '200181224005741', null, null, null, '2001812240057411', '2001812240057412');
INSERT INTO `extension_table` VALUES ('229', '12345641', null, null, null, '123456411', '123456412');
INSERT INTO `extension_table` VALUES ('230', '12345611', null, null, null, '123456111', '123456112');
INSERT INTO `extension_table` VALUES ('231', '12345621', null, null, null, '123456211', '123456212');
INSERT INTO `extension_table` VALUES ('232', '12345631', null, null, null, '123456311', '123456312');
INSERT INTO `extension_table` VALUES ('233', '65432121', null, null, null, '654321211', '654321212');
INSERT INTO `extension_table` VALUES ('234', '65432131', null, null, null, '654321311', '654321312');
INSERT INTO `extension_table` VALUES ('235', '65432111', null, null, null, '654321111', '654321112');
INSERT INTO `extension_table` VALUES ('236', '65432141', null, null, null, '654321411', '654321412');
INSERT INTO `extension_table` VALUES ('237', '200180929018841', null, null, null, '2001809290188411', '2001809290188412');
INSERT INTO `extension_table` VALUES ('238', '200180929018831', null, null, null, '2001809290188311', '2001809290188312');
INSERT INTO `extension_table` VALUES ('239', '200180929018821', null, null, null, '2001809290188211', '2001809290188212');
INSERT INTO `extension_table` VALUES ('240', '200180929018811', null, null, null, '2001809290188111', '2001809290188112');
INSERT INTO `extension_table` VALUES ('241', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('242', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('243', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('244', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('245', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('246', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('247', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('248', 'NaN1', null, null, null, 'NaN11', 'NaN12');
INSERT INTO `extension_table` VALUES ('249', '200181224012511', null, null, null, '2001812240125111', '2001812240125112');
INSERT INTO `extension_table` VALUES ('250', '200181224012521', null, null, null, '2001812240125211', '2001812240125212');
INSERT INTO `extension_table` VALUES ('251', '200181224012531', null, null, null, '2001812240125311', '2001812240125312');
INSERT INTO `extension_table` VALUES ('252', '200181224012541', null, null, null, '2001812240125411', '2001812240125412');
INSERT INTO `extension_table` VALUES ('253', '200181224006441', null, null, null, '2001812240064411', '2001812240064412');
INSERT INTO `extension_table` VALUES ('254', '200181224006431', null, null, null, '2001812240064311', '2001812240064312');
INSERT INTO `extension_table` VALUES ('255', '200181224006411', null, null, null, '2001812240064111', '2001812240064112');
INSERT INTO `extension_table` VALUES ('256', '200181224006421', null, null, null, '2001812240064211', '2001812240064212');
INSERT INTO `extension_table` VALUES ('257', '200181224008811', null, null, null, '2001812240088111', '2001812240088112');
INSERT INTO `extension_table` VALUES ('258', '200181224008821', null, null, null, '2001812240088211', '2001812240088212');
INSERT INTO `extension_table` VALUES ('259', '200181224008831', null, null, null, '2001812240088311', '2001812240088312');
INSERT INTO `extension_table` VALUES ('260', '200181224008841', null, null, null, '2001812240088411', '2001812240088412');
INSERT INTO `extension_table` VALUES ('261', '021', null, null, null, '0211', '0212');
INSERT INTO `extension_table` VALUES ('262', '011', null, null, null, '0111', '0112');
INSERT INTO `extension_table` VALUES ('263', '031', null, null, null, '0311', '0312');
INSERT INTO `extension_table` VALUES ('264', '041', null, null, null, '0411', '0412');
INSERT INTO `extension_table` VALUES ('265', '011', null, null, null, '0111', '0112');
INSERT INTO `extension_table` VALUES ('266', '031', null, null, null, '0311', '0312');
INSERT INTO `extension_table` VALUES ('267', '041', null, null, null, '0411', '0412');
INSERT INTO `extension_table` VALUES ('268', '021', null, null, null, '0211', '0212');
INSERT INTO `extension_table` VALUES ('269', '14582456654531', null, null, null, '145824566545311', '145824566545312');
INSERT INTO `extension_table` VALUES ('270', '14582456654521', null, null, null, '145824566545211', '145824566545212');
INSERT INTO `extension_table` VALUES ('271', '14582456654511', null, null, null, '145824566545111', '145824566545112');
INSERT INTO `extension_table` VALUES ('272', '14582456654541', null, null, null, '145824566545411', '145824566545412');
INSERT INTO `extension_table` VALUES ('273', '114564621', null, null, null, '1145646211', '1145646212');
INSERT INTO `extension_table` VALUES ('274', '114564611', null, null, null, '1145646111', '1145646112');
INSERT INTO `extension_table` VALUES ('275', '114564631', null, null, null, '1145646311', '1145646312');
INSERT INTO `extension_table` VALUES ('276', '114564641', null, null, null, '1145646411', '1145646412');
INSERT INTO `extension_table` VALUES ('277', '200181224004011', null, null, null, '2001812240040111', '2001812240040112');
INSERT INTO `extension_table` VALUES ('278', '200181224004021', null, null, null, '2001812240040211', '2001812240040212');
INSERT INTO `extension_table` VALUES ('279', '200181224004031', null, null, null, '2001812240040311', '2001812240040312');
INSERT INTO `extension_table` VALUES ('280', '200181224004041', null, null, null, '2001812240040411', '2001812240040412');
INSERT INTO `extension_table` VALUES ('281', '125485411', null, null, null, '1254854111', '1254854112');
INSERT INTO `extension_table` VALUES ('282', '125485431', null, null, null, '1254854311', '1254854312');
INSERT INTO `extension_table` VALUES ('283', '125485441', null, null, null, '1254854411', '1254854412');
INSERT INTO `extension_table` VALUES ('284', '125485421', null, null, null, '1254854211', '1254854212');
INSERT INTO `extension_table` VALUES ('285', '12345811', null, null, null, '123458111', '123458112');
INSERT INTO `extension_table` VALUES ('286', '12345821', null, null, null, '123458211', '123458212');
INSERT INTO `extension_table` VALUES ('287', '12345831', null, null, null, '123458311', '123458312');
INSERT INTO `extension_table` VALUES ('288', '12345841', null, null, null, '123458411', '123458412');
INSERT INTO `extension_table` VALUES ('289', '15427411', null, null, null, '154274111', '154274112');
INSERT INTO `extension_table` VALUES ('290', '15427421', null, null, null, '154274211', '154274212');
INSERT INTO `extension_table` VALUES ('291', '15427431', null, null, null, '154274311', '154274312');
INSERT INTO `extension_table` VALUES ('292', '15427441', null, null, null, '154274411', '154274412');
INSERT INTO `extension_table` VALUES ('293', '200181224003311', null, null, null, '2001812240033111', '2001812240033112');
INSERT INTO `extension_table` VALUES ('294', '200181224003321', null, null, null, '2001812240033211', '2001812240033212');
INSERT INTO `extension_table` VALUES ('295', '200181224003331', null, null, null, '2001812240033311', '2001812240033312');
INSERT INTO `extension_table` VALUES ('296', '200181224003341', null, null, null, '2001812240033411', '2001812240033412');
INSERT INTO `extension_table` VALUES ('297', '200181224007111', null, null, null, '2001812240071111', '2001812240071112');
INSERT INTO `extension_table` VALUES ('298', '200181224007121', null, null, null, '2001812240071211', '2001812240071212');
INSERT INTO `extension_table` VALUES ('299', '200181224007131', null, null, null, '2001812240071311', '2001812240071312');
INSERT INTO `extension_table` VALUES ('300', '200181224007141', null, null, null, '2001812240071411', '2001812240071412');
INSERT INTO `extension_table` VALUES ('301', '7852644875411', null, null, null, '78526448754111', '78526448754112');
INSERT INTO `extension_table` VALUES ('302', '7852644875421', null, null, null, '78526448754211', '78526448754212');
INSERT INTO `extension_table` VALUES ('303', '7852644875431', null, null, null, '78526448754311', '78526448754312');
INSERT INTO `extension_table` VALUES ('304', '7852644875441', null, null, null, '78526448754411', '78526448754412');
INSERT INTO `extension_table` VALUES ('305', '74584831', null, null, null, '745848311', '745848312');
INSERT INTO `extension_table` VALUES ('306', '74584811', null, null, null, '745848111', '745848112');
INSERT INTO `extension_table` VALUES ('307', '74584821', null, null, null, '745848211', '745848212');
INSERT INTO `extension_table` VALUES ('308', '74584841', null, null, null, '745848411', '745848412');

-- ----------------------------
-- Table structure for `parameter_table`
-- ----------------------------
DROP TABLE IF EXISTS `parameter_table`;
CREATE TABLE `parameter_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `repairs` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `evaluate` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `shits` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `access_token` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of parameter_table
-- ----------------------------
INSERT INTO `parameter_table` VALUES ('2', '地板破损*/*地面积水*/*马桶漏水*/*马桶盖破损', '廊坊旅游找厕所', '气味*/*卫生*/*其他', '占地', '20_yz-SJfr0UlPKRRzZc9jtd72Y1AXkJdYOPt7qlcMSx0CwUxldqq2Gf5LJfQBVR8W2XsXjrSo_mST6uv1xx6bqkJhWT_QbH0zhg4FTwUP9Tvko7tiZU9qU-iz1cIGMQk1Azz0vH0rN1trSz5jiFOEjAAAOXN');

-- ----------------------------
-- Table structure for `recordeddata_table`
-- ----------------------------
DROP TABLE IF EXISTS `recordeddata_table`;
CREATE TABLE `recordeddata_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) DEFAULT NULL,
  `male` text,
  `female` text,
  `third` text,
  `unisex` text,
  `sn` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1041586 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recordeddata_table
-- ----------------------------
INSERT INTO `recordeddata_table` VALUES ('1041576', '1554284012', '{\"in\":0,\"out\":0,\"stay\":1}', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', 'undefined', '2001812240057');
INSERT INTO `recordeddata_table` VALUES ('1041577', '1554284304', '{\"extension\":{\"pit_10000\":\"0\"}}', 'undefined', 'undefined', 'undefined', '2001812240057');
INSERT INTO `recordeddata_table` VALUES ('1041578', '1554283947', '{\"extension\":{\"pit_10000\":\"1\"}}', 'undefined', 'undefined', 'undefined', '2001812240057');
INSERT INTO `recordeddata_table` VALUES ('1041579', '1554284308', '{\"extension\":{\"pit_10000\":\"1\"}}', 'undefined', 'undefined', 'undefined', '2001812240057');
INSERT INTO `recordeddata_table` VALUES ('1041580', '1554284560', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":2,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', 'undefined', '2001812240125');
INSERT INTO `recordeddata_table` VALUES ('1041581', '1554284440', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', 'undefined', '2001812240125');
INSERT INTO `recordeddata_table` VALUES ('1041582', '1554284562', 'undefined', '{\"extension\":{\"pit_20002\":\"1\"}}', 'undefined', 'undefined', '2001812240125');
INSERT INTO `recordeddata_table` VALUES ('1041583', '1554284500', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":1}', '{\"in\":0,\"out\":0,\"stay\":0}', 'undefined', '2001812240125');
INSERT INTO `recordeddata_table` VALUES ('1041584', '1554284380', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', 'undefined', '2001812240125');
INSERT INTO `recordeddata_table` VALUES ('1041585', '1554284117', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', '{\"in\":0,\"out\":0,\"stay\":0}', 'undefined', '2001812240040');

-- ----------------------------
-- Table structure for `repairs_table`
-- ----------------------------
DROP TABLE IF EXISTS `repairs_table`;
CREATE TABLE `repairs_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `RepairsPart` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `time` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `tag` varchar(2) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `nameID` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `site` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `picture` text CHARACTER SET utf8,
  `headphoto` text CHARACTER SET utf8,
  `weixinName` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `longitude` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `latitude` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `SN` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of repairs_table
-- ----------------------------
INSERT INTO `repairs_table` VALUES ('84', '地面积水*/*马桶漏水', '2019-3-9*/*23:03:27', '已', '公共厕所', '5314189384555790162', '河北省廊坊市广阳区银河北路人民公园', '厕所测试', '20190309/20190309230328wxd42f8d093aae3ed8.o6zAJs-fPh6t7_u7ekbWeeqrdQpc.OIz2H4VGtS8Rcc769441b88d0db0b103805278e1c7cc.png', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVayiaOPnQs3yUdiav7ah46T0sQ/132', '心', '116.70082', '39.53129', '2001812240064');
INSERT INTO `repairs_table` VALUES ('85', '地面积水*/*马桶漏水', '2019-3-9*/*23:04:41', '已', '公共厕所', '5314189384555790162', '河北省廊坊市广阳区银河北路人民公园', '测试', '20190309/20190309230441wxd42f8d093aae3ed8.o6zAJs-fPh6t7_u7ekbWeeqrdQpc.fBrUGLDYh4fIbf94512e3dc38eb240ae885b8d8f4d6c.jpg', 'https://wx.qlogo.cn/mmopen/vi_32/wy5cjH3hJpejVbm8555AWoQTlqWbGxlBcZ63lszLrbFvw1SYlANFxmYqG0uVhzVayiaOPnQs3yUdiav7ah46T0sQ/132', '心', '116.70082', '39.53129', '2001812240064');
INSERT INTO `repairs_table` VALUES ('86', '地面积水*/*马桶漏水', '2019-3-30*/*11:06:06', '未', '文化公园旅游厕所', '254983670254682', '文化公园北侧', '保修', '20190330/20190330110607tmp_71fe198778241f7546c5af12dd2b3d8c8da9926e5d734cdf.jpg*/*20190330/20190330110608tmp_bffdf2e8e839552e1745b57c66bd35e55d480ab690e6caee.png', 'https://wx.qlogo.cn/mmopen/vi_32/AZicSud0BS5fuICWWwg08V79e5LdFkdAvKCDkeh5ewueADDenlHTgNyQDfM9MccrOertnVaZQ8tcgRakYvJEsibw/132', '閑人', '116.7226185438368', '39.55752522786458', '2001812240057');

-- ----------------------------
-- Table structure for `stat_table`
-- ----------------------------
DROP TABLE IF EXISTS `stat_table`;
CREATE TABLE `stat_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name_ID` varchar(30) DEFAULT NULL,
  `ina` int(11) DEFAULT NULL,
  `outa` int(11) DEFAULT NULL,
  `extension` varchar(30) DEFAULT NULL,
  `staya` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stat_table
-- ----------------------------
INSERT INTO `stat_table` VALUES ('157', '20018102603094', null, null, '200181026030941', null);
INSERT INTO `stat_table` VALUES ('158', '20018102603091', '0', '0', '200181026030911', '0');
INSERT INTO `stat_table` VALUES ('159', '20018102603092', '0', '0', '200181026030921', '0');
INSERT INTO `stat_table` VALUES ('160', '20018102603093', '0', '0', '200181026030931', '0');
INSERT INTO `stat_table` VALUES ('161', '26485764654', null, null, '264857646541', null);
INSERT INTO `stat_table` VALUES ('162', '26485764653', null, null, '264857646531', null);
INSERT INTO `stat_table` VALUES ('163', '26485764652', null, null, '264857646521', null);
INSERT INTO `stat_table` VALUES ('164', '26485764651', null, null, '264857646511', null);
INSERT INTO `stat_table` VALUES ('165', '52486457254', null, null, '524864572541', null);
INSERT INTO `stat_table` VALUES ('166', '52486457251', null, null, '524864572511', null);
INSERT INTO `stat_table` VALUES ('167', '52486457252', null, null, '524864572521', null);
INSERT INTO `stat_table` VALUES ('168', '52486457253', null, null, '524864572531', null);
INSERT INTO `stat_table` VALUES ('169', '348756983724', null, null, '3487569837241', null);
INSERT INTO `stat_table` VALUES ('170', '348756983723', null, null, '3487569837231', null);
INSERT INTO `stat_table` VALUES ('171', '348756983721', null, null, '3487569837211', null);
INSERT INTO `stat_table` VALUES ('172', '348756983722', null, null, '3487569837221', null);
INSERT INTO `stat_table` VALUES ('173', '546831', null, null, '5468311', null);
INSERT INTO `stat_table` VALUES ('174', '546834', null, null, '5468341', null);
INSERT INTO `stat_table` VALUES ('175', '546832', null, null, '5468321', null);
INSERT INTO `stat_table` VALUES ('176', '546833', null, null, '5468331', null);
INSERT INTO `stat_table` VALUES ('177', '34782642', null, null, '347826421', null);
INSERT INTO `stat_table` VALUES ('178', '34782641', null, null, '347826411', null);
INSERT INTO `stat_table` VALUES ('179', '34782643', null, null, '347826431', null);
INSERT INTO `stat_table` VALUES ('180', '34782644', null, null, '347826441', null);
INSERT INTO `stat_table` VALUES ('181', '4358763452', null, null, '43587634521', null);
INSERT INTO `stat_table` VALUES ('182', '4358763451', null, null, '43587634511', null);
INSERT INTO `stat_table` VALUES ('183', '4358763453', null, null, '43587634531', null);
INSERT INTO `stat_table` VALUES ('184', '4358763454', null, null, '43587634541', null);
INSERT INTO `stat_table` VALUES ('185', '125469851', null, null, '1254698511', null);
INSERT INTO `stat_table` VALUES ('186', '125469854', null, null, '1254698541', null);
INSERT INTO `stat_table` VALUES ('187', '125469853', null, null, '1254698531', null);
INSERT INTO `stat_table` VALUES ('188', '125469852', null, null, '1254698521', null);
INSERT INTO `stat_table` VALUES ('189', '123451', null, null, '1234511', null);
INSERT INTO `stat_table` VALUES ('190', '123454', null, null, '1234541', null);
INSERT INTO `stat_table` VALUES ('191', '123452', null, null, '1234521', null);
INSERT INTO `stat_table` VALUES ('192', '123453', null, null, '1234531', null);
INSERT INTO `stat_table` VALUES ('193', '25468471', null, null, '254684711', null);
INSERT INTO `stat_table` VALUES ('194', '25468474', null, null, '254684741', null);
INSERT INTO `stat_table` VALUES ('195', '25468472', null, null, '254684721', null);
INSERT INTO `stat_table` VALUES ('196', '25468473', null, null, '254684731', null);
INSERT INTO `stat_table` VALUES ('197', '123576453541', null, null, '1235764535411', null);
INSERT INTO `stat_table` VALUES ('198', '123576453544', null, null, '1235764535441', null);
INSERT INTO `stat_table` VALUES ('199', '123576453543', null, null, '1235764535431', null);
INSERT INTO `stat_table` VALUES ('200', '123576453542', null, null, '1235764535421', null);
INSERT INTO `stat_table` VALUES ('201', '254685946251', null, null, '2546859462511', null);
INSERT INTO `stat_table` VALUES ('202', '254685946252', null, null, '2546859462521', null);
INSERT INTO `stat_table` VALUES ('203', '254685946253', null, null, '2546859462531', null);
INSERT INTO `stat_table` VALUES ('204', '254685946254', null, null, '2546859462541', null);
INSERT INTO `stat_table` VALUES ('205', '628581', null, null, '6285811', null);
INSERT INTO `stat_table` VALUES ('206', '628582', null, null, '6285821', null);
INSERT INTO `stat_table` VALUES ('207', '628583', null, null, '6285831', null);
INSERT INTO `stat_table` VALUES ('208', '628584', null, null, '6285841', null);
INSERT INTO `stat_table` VALUES ('209', '1234561', null, null, '12345611', null);
INSERT INTO `stat_table` VALUES ('210', '1234562', null, null, '12345621', null);
INSERT INTO `stat_table` VALUES ('211', '1234563', null, null, '12345631', null);
INSERT INTO `stat_table` VALUES ('212', '1234564', null, null, '12345641', null);
INSERT INTO `stat_table` VALUES ('213', '20018122401184', null, null, '200181224011841', null);
INSERT INTO `stat_table` VALUES ('214', '20018122401183', null, null, '200181224011831', null);
INSERT INTO `stat_table` VALUES ('215', '20018122401181', null, null, '200181224011811', null);
INSERT INTO `stat_table` VALUES ('216', '20018122401182', null, null, '200181224011821', null);
INSERT INTO `stat_table` VALUES ('217', '2453361451', null, null, '24533614511', null);
INSERT INTO `stat_table` VALUES ('218', '2453361452', null, null, '24533614521', null);
INSERT INTO `stat_table` VALUES ('219', '2453361453', null, null, '24533614531', null);
INSERT INTO `stat_table` VALUES ('220', '2453361454', null, null, '24533614541', null);
INSERT INTO `stat_table` VALUES ('221', '6497531', null, null, '64975311', null);
INSERT INTO `stat_table` VALUES ('222', '6497532', null, null, '64975321', null);
INSERT INTO `stat_table` VALUES ('223', '6497533', null, null, '64975331', null);
INSERT INTO `stat_table` VALUES ('224', '6497534', null, null, '64975341', null);
INSERT INTO `stat_table` VALUES ('225', '20018122400571', '0', '0', '200181224005711', '1');
INSERT INTO `stat_table` VALUES ('226', '20018122400572', '0', '0', '200181224005721', '0');
INSERT INTO `stat_table` VALUES ('227', '20018122400573', '0', '0', '200181224005731', '0');
INSERT INTO `stat_table` VALUES ('228', '20018122400574', null, null, '200181224005741', null);
INSERT INTO `stat_table` VALUES ('229', '1234564', null, null, '12345641', null);
INSERT INTO `stat_table` VALUES ('230', '1234563', null, null, '12345631', null);
INSERT INTO `stat_table` VALUES ('231', '1234561', null, null, '12345611', null);
INSERT INTO `stat_table` VALUES ('232', '1234562', null, null, '12345621', null);
INSERT INTO `stat_table` VALUES ('233', '6543211', null, null, '65432111', null);
INSERT INTO `stat_table` VALUES ('234', '6543212', null, null, '65432121', null);
INSERT INTO `stat_table` VALUES ('235', '6543213', null, null, '65432131', null);
INSERT INTO `stat_table` VALUES ('236', '6543214', null, null, '65432141', null);
INSERT INTO `stat_table` VALUES ('237', '20018092901884', null, null, '200180929018841', null);
INSERT INTO `stat_table` VALUES ('238', '20018092901883', '0', '0', '200180929018831', '0');
INSERT INTO `stat_table` VALUES ('239', '20018092901882', '0', '0', '200180929018821', '0');
INSERT INTO `stat_table` VALUES ('240', '20018092901881', '0', '0', '200180929018811', '0');
INSERT INTO `stat_table` VALUES ('241', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('242', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('243', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('244', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('245', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('246', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('247', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('248', 'NaN', null, null, 'NaN1', null);
INSERT INTO `stat_table` VALUES ('249', '20018122401252', '0', '0', '200181224012521', '0');
INSERT INTO `stat_table` VALUES ('250', '20018122401251', '0', '0', '200181224012511', '0');
INSERT INTO `stat_table` VALUES ('251', '20018122401253', '0', '0', '200181224012531', '0');
INSERT INTO `stat_table` VALUES ('252', '20018122401254', null, null, '200181224012541', null);
INSERT INTO `stat_table` VALUES ('253', '20018122400642', '0', '0', '200181224006421', '0');
INSERT INTO `stat_table` VALUES ('254', '20018122400641', '0', '0', '200181224006411', '0');
INSERT INTO `stat_table` VALUES ('255', '20018122400643', '0', '0', '200181224006431', '0');
INSERT INTO `stat_table` VALUES ('256', '20018122400644', null, null, '200181224006441', null);
INSERT INTO `stat_table` VALUES ('257', '20018122400884', null, null, '200181224008841', null);
INSERT INTO `stat_table` VALUES ('258', '20018122400881', '0', '0', '200181224008811', '0');
INSERT INTO `stat_table` VALUES ('259', '20018122400882', '0', '0', '200181224008821', '0');
INSERT INTO `stat_table` VALUES ('260', '20018122400883', '0', '0', '200181224008831', '0');
INSERT INTO `stat_table` VALUES ('261', '01', null, null, '011', null);
INSERT INTO `stat_table` VALUES ('262', '02', null, null, '021', null);
INSERT INTO `stat_table` VALUES ('263', '03', null, null, '031', null);
INSERT INTO `stat_table` VALUES ('264', '04', null, null, '041', null);
INSERT INTO `stat_table` VALUES ('265', '04', null, null, '041', null);
INSERT INTO `stat_table` VALUES ('266', '02', null, null, '021', null);
INSERT INTO `stat_table` VALUES ('267', '01', null, null, '011', null);
INSERT INTO `stat_table` VALUES ('268', '03', null, null, '031', null);
INSERT INTO `stat_table` VALUES ('269', '154032548643', null, null, '1540325486431', null);
INSERT INTO `stat_table` VALUES ('270', '154032548642', null, null, '1540325486421', null);
INSERT INTO `stat_table` VALUES ('271', '1458245665454', null, null, '14582456654541', null);
INSERT INTO `stat_table` VALUES ('272', '1458245665453', null, null, '14582456654531', null);
INSERT INTO `stat_table` VALUES ('273', '1458245665451', null, null, '14582456654511', null);
INSERT INTO `stat_table` VALUES ('274', '1458245665452', null, null, '14582456654521', null);
INSERT INTO `stat_table` VALUES ('275', '11456464', null, null, '114564641', null);
INSERT INTO `stat_table` VALUES ('276', '11456463', null, null, '114564631', null);
INSERT INTO `stat_table` VALUES ('277', '11456461', null, null, '114564611', null);
INSERT INTO `stat_table` VALUES ('278', '11456462', null, null, '114564621', null);
INSERT INTO `stat_table` VALUES ('279', '20018122400404', null, null, '200181224004041', null);
INSERT INTO `stat_table` VALUES ('280', '20018122400401', '0', '0', '200181224004011', '0');
INSERT INTO `stat_table` VALUES ('281', '20018122400403', '0', '0', '200181224004031', '0');
INSERT INTO `stat_table` VALUES ('282', '20018122400402', '0', '0', '200181224004021', '0');
INSERT INTO `stat_table` VALUES ('283', '12548544', null, null, '125485441', null);
INSERT INTO `stat_table` VALUES ('284', '12548541', null, null, '125485411', null);
INSERT INTO `stat_table` VALUES ('285', '12548543', null, null, '125485431', null);
INSERT INTO `stat_table` VALUES ('286', '12548542', null, null, '125485421', null);
INSERT INTO `stat_table` VALUES ('287', '1234584', null, null, '12345841', null);
INSERT INTO `stat_table` VALUES ('288', '1234582', null, null, '12345821', null);
INSERT INTO `stat_table` VALUES ('289', '1234583', null, null, '12345831', null);
INSERT INTO `stat_table` VALUES ('290', '1234581', null, null, '12345811', null);
INSERT INTO `stat_table` VALUES ('291', '1542744', null, null, '15427441', null);
INSERT INTO `stat_table` VALUES ('292', '1542741', null, null, '15427411', null);
INSERT INTO `stat_table` VALUES ('293', '1542742', null, null, '15427421', null);
INSERT INTO `stat_table` VALUES ('294', '1542743', null, null, '15427431', null);
INSERT INTO `stat_table` VALUES ('295', '20018122400334', null, null, '200181224003341', null);
INSERT INTO `stat_table` VALUES ('296', '20018122400332', null, null, '200181224003321', null);
INSERT INTO `stat_table` VALUES ('297', '20018122400333', null, null, '200181224003331', null);
INSERT INTO `stat_table` VALUES ('298', '20018122400331', null, null, '200181224003311', null);
INSERT INTO `stat_table` VALUES ('299', '20018122400714', null, null, '200181224007141', null);
INSERT INTO `stat_table` VALUES ('300', '20018122400711', null, null, '200181224007111', null);
INSERT INTO `stat_table` VALUES ('301', '20018122400713', null, null, '200181224007131', null);
INSERT INTO `stat_table` VALUES ('302', '20018122400712', null, null, '200181224007121', null);
INSERT INTO `stat_table` VALUES ('303', '785264487541', null, null, '7852644875411', null);
INSERT INTO `stat_table` VALUES ('304', '785264487542', null, null, '7852644875421', null);
INSERT INTO `stat_table` VALUES ('305', '785264487543', null, null, '7852644875431', null);
INSERT INTO `stat_table` VALUES ('306', '785264487544', null, null, '7852644875441', null);
INSERT INTO `stat_table` VALUES ('307', '7458481', null, null, '74584811', null);
INSERT INTO `stat_table` VALUES ('308', '7458482', null, null, '74584821', null);
INSERT INTO `stat_table` VALUES ('309', '7458483', null, null, '74584831', null);
INSERT INTO `stat_table` VALUES ('310', '7458484', null, null, '74584841', null);

-- ----------------------------
-- Table structure for `toiletdetails_table`
-- ----------------------------
DROP TABLE IF EXISTS `toiletdetails_table`;
CREATE TABLE `toiletdetails_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `nameID` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `HealthStar` int(2) DEFAULT NULL,
  `picture` text CHARACTER SET utf8,
  `site` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `warrantyNumber` int(11) DEFAULT NULL,
  `LikeNumber` int(11) DEFAULT NULL,
  `tauntNumber` int(11) DEFAULT NULL,
  `male` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `female` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `third` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `unisex` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `Tencent_ID` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `longitude` text CHARACTER SET utf8,
  `latitude` text CHARACTER SET utf8,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of toiletdetails_table
-- ----------------------------
INSERT INTO `toiletdetails_table` VALUES ('55', '金丰农科园1', '2001812240118', '5', '20190128143125tmp_fdc7e0e95019789fa162d3b3811cd5e069b556f5bae45db9.jpg', '金丰农科园1', '0', '0', '0', '20018122401181', '20018122401182', '20018122401183', '20018122401184', '125487865415472', '116.72849175347223', '39.583599446614585');
INSERT INTO `toiletdetails_table` VALUES ('58', '文化公园旅游厕所', '2001812240057', '5', '20190225122758tmp_ceaf681772ceba5f130d6f5c64d009e1aaef0744f66f13ca.jpg', '文化公园北侧', '1', '1', '0', '20018122400571', '20018122400572', '20018122400573', '20018122400574', '254983670254682', '116.7226185438368', '39.55752522786458');
INSERT INTO `toiletdetails_table` VALUES ('59', null, '2001810260309', null, null, null, null, null, null, '20018102603091', '20018102603092', '20018102603093', '20018102603094', null, null, null);
INSERT INTO `toiletdetails_table` VALUES ('62', null, '2001809290188', null, null, null, null, null, null, '20018092901881', '20018092901882', '20018092901883', '20018092901884', null, null, null);
INSERT INTO `toiletdetails_table` VALUES ('65', '公共厕所', '2001812240125', '5', '20190313143651tmp_60de9bd037ed3ae1cea4b4d8a97b56e7b12d84e18b960d1f.jpg', '河北省廊坊市广阳区廊坊体育场西侧廊坊市文化公园', '0', '0', '0', '20018122401251', '20018122401252', '20018122401253', '20018122401254', '10597145061680802582', '116.7195', '39.55315');
INSERT INTO `toiletdetails_table` VALUES ('66', '公共厕所', '2001812240064', '5', '20190303090952tmp_3672863b11cd56afe91e48f85f555d84d8240c24317aacce.jpg', '河北省廊坊市广阳区银河北路人民公园', '2', '1', '0', '20018122400641', '20018122400642', '20018122400643', '20018122400644', '5314189384555790162', '116.70082', '39.53129');
INSERT INTO `toiletdetails_table` VALUES ('67', '公共厕所', '2001812240088', '5', '20190303154935tmp_4df83de5621d5a35de87136d628784317c213b0ece9d33f0.jpg', '河北省廊坊市广阳区 ', '0', '0', '0', '20018122400881', '20018122400882', '20018122400883', '20018122400884', '11723999760979464830', '116.65228', '39.5508');
INSERT INTO `toiletdetails_table` VALUES ('100', '林栖谷旅游智慧厕所', '2001812240040', '5', null, '永清林栖谷景区内', '0', '0', '0', '20018122400401', '20018122400402', '20018122400403', '20018122400404', '154795368425674', '116.57726155598958', '39.38501030815972');
INSERT INTO `toiletdetails_table` VALUES ('113', '大厂影视小镇旅游智慧厕所2号', '2001812240033', '5', '20190321132118tmp_d952ce8a741ce87841b5a12d3360ccb6b6520e946eee13b7.jpg', '大厂影视小镇7号楼一层', '0', '0', '0', '20018122400331', '20018122400332', '20018122400333', '20018122400334', '820283655606546', '116.88699055989584', '39.89126410590278');
INSERT INTO `toiletdetails_table` VALUES ('114', '大厂影视小镇旅游厕所1号', '2001812240071', '5', '20190322115319tmp_1debcc25daffa5f2eda3c0d525f62065d790a99aa28b8b0f.jpg', '大厂影视小镇7号楼一层', '0', '0', '0', '20018122400711', '20018122400712', '20018122400713', '20018122400714', '950962964707057', '116.88646864149305', '39.89116455078125');
INSERT INTO `toiletdetails_table` VALUES ('115', '广阳区长征现代农业创意产业园旅游厕所', '0', '3', '20190403145646tmp_a05a748ae591b41f9a98e05d03c4eaecf46025d0c2837f0f.jpg', '广阳区长征现代农业创意产业园东侧', null, null, null, null, null, null, null, '886986452786290', '116.654619140625', '39.55094292534722');
INSERT INTO `toiletdetails_table` VALUES ('118', '广阳区长征现代农业创意产业园旅游厕所', '0', '3', '20190403154124tmp_4e9b26ae08f97f7c7c968165328f07e3f8148ee0afd22ca7.jpg', '广阳区长征现代农业创意产业园南园区西北', null, null, null, null, null, null, null, '881284203773523', '116.65205702039931', '39.55216281467014');
INSERT INTO `toiletdetails_table` VALUES ('119', '公共厕所', '0', '3', '20190403160103tmp_83ff0aeb3e4c25a22237f738ffda8fdd406af01019b77618.jpg', '河北省廊坊市广阳区 ', null, null, null, null, null, null, null, '10232461562660653480', '116.65416', '39.5541');
