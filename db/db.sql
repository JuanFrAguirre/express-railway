use usersdb;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NULL,
  coordenates VARCHAR(50) NULL,
  loc VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  brand VARCHAR(50) NULL,
  createdAt VARCHAR(50) NULL,
  editedAt VARCHAR(50) NULL
);

create table products (
	id int primary key auto_increment,
	name varchar(50) not null,
  photoUrl varchar(100) not null,
  description varchar(1000) not null,
  createdAt VARCHAR(50) NULL,
  editedAt VARCHAR(50) NULL
);

drop table stores;
drop table products;

insert into products (
	name, photoUrl, description, createdAt)
values (
	'Paño de limpieza','https://picsum.photos.com/200/200','La mejor opcion para la limpieza de tus lentes.',NOW()
);

select * from stores;

select * from products;

create database users;
use users;
