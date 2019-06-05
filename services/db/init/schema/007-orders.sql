 create table 
if not exists orders
(
    order_id uuid primary key default gen_random_uuid(),
    user_handle uuid references users(user_handle),
    order_date timestamptz
    
);
grant select, insert, update, delete on table orders to project_app;
grant select on table orders to project_read;
