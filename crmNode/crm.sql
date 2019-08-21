SET NAMES UTF8;
DROP DATABASE IF EXISTS crm;
CREATE DATABASE crm CHARSET=UTF8;
USE crm;
CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(20),
    upwd VARCHAR(32),
    headpic VARCHAR(128),
    regtime DATETIME,
    logincount INT
);
INSERT INTO users VALUES(NULL,'tom','123456','img/1.jpg',now(),0);
INSERT INTO users VALUES(NULL,'jim','123456','img/2.jpg',now(),0);