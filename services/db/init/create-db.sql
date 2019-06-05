drop table if exists plans;
drop table if exists passhash;
drop table if exists users;
drop table if exists daily_messages;
drop table if exists admins;

drop database if exists project;
drop role if exists project_app;

-- create role admin login password 'admin' valid until 'infinity';
create role project_app login password 'projectdev' valid until 'infinity';
create database project;
\c project
create extension if not exists pgcrypto;
create extension if not exists pg_stat_statements;
