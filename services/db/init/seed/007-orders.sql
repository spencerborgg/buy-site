insert into orders (order_id, user_handle, order_date) values
    ('0893e1d5-80bf-4cb2-a762-61bca694d057', '037b4897-8a2a-46b6-8ed7-47a555bb40f2', NOW() - INTERVAL '1 DAY'),
    ('8b721e8f-c130-4687-bf3b-fd3536b784b6', '037b4897-8a2a-46b6-8ed7-47a555bb40f2', NOW() - INTERVAL '23 DAY'),
    ('ed624037-a70f-4c0d-8ffc-360b1beed24f', '06fad102-1a73-41ad-ba62-7bbd4be3278f', NOW() - INTERVAL '4 DAY'),
    ('92f5da3e-34df-4b33-93e7-1976407c9b8c', '8b5213b1-4c41-499e-a1db-93da54713dbb', NOW() - INTERVAL '6 DAY'),
    ('656b872f-76f5-4363-aa8b-de2dab756e40', 'b9cdffec-ad82-4855-8cad-5315c3a06610', NOW() - INTERVAL '12 DAY')
    on conflict do nothing