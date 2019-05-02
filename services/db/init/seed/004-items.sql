insert into items (item_handle, item_name, item_price) values
    ('a73d3a85-49f3-42f3-9266-fe2cdbf4b125', 'item1', '123904'),
    ('b6d062af-b762-4a5a-9966-2c9e4bf66d27', 'item2', '82934'),
    ('e9535a51-5d84-4622-8a7e-fe815f0bc938', 'item3', '3849'),
    ('be1f00a7-aacb-4053-b5f8-d1d88e59ffe3', 'item4', '29342')
    on conflict do nothing;