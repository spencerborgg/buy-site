import { ErrorWithStatus } from "../../utils/errors";
import { fetchItemsFromDB } from "../repositories/items";
import { grabOneItem } from "../repositories/items";
let loggedIn = true;

// export async function createItem(item) {
//   console.log("new item i want to make", item);
//   if (!item) {
//     throw new ErrorWithStatus({ msg: "please provide item", status: 400 });
//   }
// }

export async function fetchAllItems() {
  if (loggedIn) {
    try {
      const results = await fetchItemsFromDB();
      return results;
    } catch (err) {
      throw new StatusError({ msg: "DB error", status: 500 });
    }
  } else {
    throw new StatusError({ msg: "user not logged in", status: 400 });
  }
}

export async function getSingleItem(id) {
  if (loggedIn) {
    try {
      const results = await grabOneItem(id);
      return results;
    } catch (err) {
      throw new StatusError({ msg: 'DB cant get item', status: 500 });
    }
  }
  else {
    throw new StatusError({ msg: "not logged in", status: 400 })
  }
}