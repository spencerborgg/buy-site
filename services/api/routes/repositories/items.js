import sql from "sql-template-strings";
import PGWrapper from "../../utils/pg-wrapper";

const itemDTOMapper = row => ({
  itemHandle: row.item_handle,
  itemName: row.item_name,
  itemPrice: row.item_price
});

export async function fetchItemsFromDB() {
  const query = sql`select * from items;`;
  return await PGWrapper.sqlAndMap(query, itemDTOMapper);
}

export async function grabOneItem() {
  const query = sql`select * from items where item_handle = ${item_handle};`;
  return await PGWrapper.sqlAndMap(query, itemDTOMapper);
}
