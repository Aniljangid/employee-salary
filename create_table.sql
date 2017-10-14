create database empsalmgt;
use empsalmgt;
create table admin(admin_company varchar(16), admin_password varchar(16));
-- insert into admin values('itspassword');

create table empdetails(id varchar(24), name varchar(24), password varchar(24) ,phnum varchar(10), companyName varchar(16), basicpay int, adv int, att int, totalsal int, PRIMARY KEY (id));