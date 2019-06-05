insert into sellers (seller_handle, items_sold) values
('b9cdffec-ad82-4855-8cad-5315c3a06610', '493'),
('06fad102-1a73-41ad-ba62-7bbd4be3278f', '23'),
('17832b68-e91e-45f4-9a92-042c69b1b9c5', '41')
on conflict do nothing;