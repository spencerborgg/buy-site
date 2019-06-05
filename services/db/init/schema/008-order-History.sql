create table 
if not exists order_history
(
    order_id uuid references orders(order_id),
    item_handle uuid references items(item_handle),
    quantity text not null,
    primary key(order_id, item_handle)    
);
grant select, insert, update, delete on table order_history to project_app;
grant select on table order_history to project_read;
