import sql from "sql-template-strings";
import PGWrapper from "../../utils/pg-wrapper";

const itemDTOMapper = row => ({
  itemHandle: row.item_handle,
  itemName: row.item_name,
  itemPrice: row.item_price
});

const itemDetailDTOMapper = row => ({
  itemHandle: row.item_handle,
  itemName: row.item_name,
  itemPrice: row.item_price,
  itemDiscript: row.item_discription,
  sellerUserName: row.username,
  sellersEmail: row.email,
  sellersJoinDate: row.joined_date
});

export async function fetchItemsFromDB() {
  const query = sql`select * from items;`;
  return await PGWrapper.sqlAndMap(query, itemDTOMapper);
}

// users.joined_date::timestamp 
export async function grabOneItem(id) {
  const query = sql`select items.item_handle,
  items.item_name,
  items.item_price,
  items.item_release,
  items.item_discription,               
  users.user_handle,             
  users.username,
  users.first_name,
  users.middle_name,
  users.last_name,
  users.suffix,
  users.email     
  from items join 
  seller_items on items.item_handle = seller_items.item_handle join 
  users on seller_items.user_handle = users.user_handle 
  where seller_items.item_handle = ${id};`;
  const results = await PGWrapper.sqlAndMap(query, itemDetailDTOMapper);
  console.log("Results", results)
  return results[0];
}