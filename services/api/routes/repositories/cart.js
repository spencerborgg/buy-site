import sql from "sql-template-strings";
import PGWrapper from "../../utils/pg-wrapper";

const cartDTO = (row) => ({
    numOfItemsInCart: row.count
});

const pullCartDTO = (row) => ({
    itemHandle: row.item_handle,
    quantity: row.quantity
});

export async function addItemsToCartForUserInDB(userHandle, items) {
    const item = items[0];
    const statement = sql`
        insert into cart values (
            ${userHandle}, 
            ${item.itemHandle}, 
            true, 
            ${item.quantity}
        )
        on conflict 
        on constraint cart_pkey 
        do update set quantity = excluded.quantity, active = true 
        returning *;`;
    await PGWrapper.sql(statement);
    const query = sql`
        select sum(quantity) as count
        from cart 
        where user_handle = ${userHandle}
        and active = true;`;

    const results = await PGWrapper.sqlAndMap(query, cartDTO);
    console.log("All done", results[0])
    return results[0];
}

export async function cartHistoryDb(userHandle) {
    const query = sql`
    select * from cart where user_handle = ${userHandle};`;
    return await PGWrapper.sqlAndMap(query, pullCartDTO);
}


