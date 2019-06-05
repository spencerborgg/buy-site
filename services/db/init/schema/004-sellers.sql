create table 
if not exists sellers
(
    seller_handle uuid primary key references users(user_handle),
    items_sold text not null
);
grant select, insert, update, delete on table sellers to project_app;
grant select on table sellers to project_read;
