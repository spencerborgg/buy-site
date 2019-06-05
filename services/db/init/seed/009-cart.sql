insert into cart (user_handle, item_handle, active, quantity)values
    ('037b4897-8a2a-46b6-8ed7-47a555bb40f2', 'a73d3a85-49f3-42f3-9266-fe2cdbf4b125', true , '2'),
    ('06fad102-1a73-41ad-ba62-7bbd4be3278f', 'e9535a51-5d84-4622-8a7e-fe815f0bc938', true , '4'),
    ('b9cdffec-ad82-4855-8cad-5315c3a06610', 'a73d3a85-49f3-42f3-9266-fe2cdbf4b125', true , '1')
on conflict do nothing;