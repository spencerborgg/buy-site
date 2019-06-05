import { wrapAsyncFunc } from "../../../utils/wrap-async-route";
import { fetchAllItems, createItem, getSingleItem } from "../../commands/items";

export default class ItemController {
  constructor(router) {
    router.get("/", wrapAsyncFunc(this.getAllItems));
    router.get("/:id", wrapAsyncFunc(this.itemDetail));
  }
  async getAllItems(req, res) {
    const ItemList = await fetchAllItems();
    res.send({ items: ItemList });
  }

  async itemDetail(req, res) {
    const { id } = req.params;
    const singleItem = await getSingleItem(id);
    res.send({ items: singleItem });
  }
}
