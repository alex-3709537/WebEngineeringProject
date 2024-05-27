create table users (
    uid int not null AUTO_INCREMENT,
    username varchar(64) not null UNIQUE,
    password varchar(64) not null,
    creationDate datetime not null,
    PRIMARY KEY(uid)
    
);


create table post (
    pid int not null AUTO_INCREMENT,
    uid int not null,
    post varchar(255), 
    date datetime, 
    PRIMARY KEY(pid)
);