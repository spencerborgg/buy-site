create table 
if not exists items
(
    item_handle uuid primary key default gen_random_uuid(),
    item_name text not null,
    item_price text not null,
    item_release timestamp,
    item_discription text
    
);
grant select, insert, update, delete on table items to project_app;
grant select on table items to project_read;
