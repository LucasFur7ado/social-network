DROP DATABASE IF EXISTS socialnetwork;
CREATE DATABASE socialnetwork;
use socialnetwork;

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    email varchar(100) NOT NULL UNIQUE,
    password varchar(200) NOT NULL, 
    role INTEGER NOT NULL DEFAULT 0,
    isVerified BOOLEAN NOT NULL DEFAULT false,
    name varchar(30) null,
    username varchar(30) not null UNIQUE,
    followers INTEGER NOT NULL DEFAULT 0,
    posts INTEGER NOT NULL DEFAULT 0,
    vCode varchar(200) NULL,
    registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE posts (
    id INTEGER NOT NULL AUTO_INCREMENT,
    content VARCHAR(300) NOT NULL,
    isPublic BOOLEAN not null default true,
    isEdited BOOLEAN not null default false,
    likesCount INTEGER not null default 0,
    commentsCount INTEGER not null default 0,
    userId integer not null,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (userId) REFERENCES users(id),
    primary key (id)
)
CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE lists (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    userId integer not null,
    foreign key (userId) REFERENCES users(id),
    primary key(id)
);

CREATE TABLE follow (
    id INTEGER NOT NULL AUTO_INCREMENT,
    followedId INTEGER NOT NULL,
    followerId INTEGER NOT NULL,
    foreign key(followedId) REFERENCES users(id),
    foreign key(followerId) REFERENCES users(id),
    primary key(id)
);

CREATE TABLE postLikes (
    id INTEGER NOT NULL AUTO_INCREMENT,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    foreign key (postId) REFERENCES posts(id),
    foreign key (userId) REFERENCES users(id),
    primary key(id)
);

CREATE TABLE inlist (
    id INTEGER NOT NULL AUTO_INCREMENT,
    listId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    foreign key (listId) REFERENCES lists(id),
    foreign key (userId) REFERENCES users(id),
    primary key(id)
);

CREATE TABLE sharedWith (
    id INTEGER NOT NULL AUTO_INCREMENT,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    foreign key (postId) REFERENCES posts(id),
    foreign key (userId) REFERENCES users(id),
    primary key(id)
);
