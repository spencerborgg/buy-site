create table 
if not exists seller_items
(
    user_handle uuid references users(user_handle),
    item_handle uuid references items(item_handle)
);
grant select, insert, update, delete on table seller_items to project_app;
grant select on table seller_items to project_read;
