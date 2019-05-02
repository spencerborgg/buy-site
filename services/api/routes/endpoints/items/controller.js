import { wrapAsyncFunc } from "../../../utils/wrap-async-route";
import { fetchAllItems, createItem } from "../../commands/items";

export default class ItemController {
  constructor(router) {
    router.get("/", wrapAsyncFunc(this.getAllItems));
  }
  async getAllItems(req, res) {
    console.log("HERE I AM dah");
    const ItemList = await fetchAllItems();
    res.send({ items: ItemList });
  }
}
