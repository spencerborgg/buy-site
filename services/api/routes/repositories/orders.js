import sql from "sql-template-strings";
import PGWrapper from "../../utils/pg-wrapper";

const orderDTOMapper = row => {
    const results = {
        orderHandle: row.order_id,
        userHandle: row.user_handle,
        soldDate: row.order_date,
        items: []
    }
    results.items = row.item_ids.map((id, index) => ({
        quantity: row.quantities[index],
        itemName: row.names[index],
        id
    }))
    return results
};

//   (order_id, user_handle, sold_date)

export async function orderHistoryDb(userHandle) {
    const query = sql`select oi.order_id, array_agg(oi.item_handle) as item_ids, 
    array_agg(oi.quantity) as quantities,
    array_agg(i.item_name) as names,
    o.user_handle,
    o.order_date
    from order_history 
    as oi join orders 
    as o on oi.order_id = o.order_id join items
    as i on oi.item_handle = i.item_handle where o.user_handle = ${userHandle} group by oi.order_id, o.user_handle, o.order_date`;
    return await PGWrapper.sqlAndMap(query, orderDTOMapper);
}
