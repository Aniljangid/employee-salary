create database empsalmgt;
use empsalmgt;
create table admin(admin_password varchar(16));
-- insert into admin values('itspassword');

create table empdetails(id int, name varchar(24), phnum int, basicpay int, adv int, att int, totalsal int, PRIMARY KEY (id));