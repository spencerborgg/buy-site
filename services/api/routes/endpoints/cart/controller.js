import { wrapAsyncFunc } from "../../../utils/wrap-async-route";
import { addItemToCartForUser, fetchCartItems } from "../../commands/cart";


export default class CartController {

    constructor(router) {
        router.get("/user", wrapAsyncFunc(this.getItemsInCart));
        router.post("/add", wrapAsyncFunc(this.addItemToCart));
    }

    async getItemsInCart(req, res) {
        const { userHandle } = req.user;
        const itemsInCart = await fetchCartItems(userHandle);
        console.log('askldfjax ')
        res.send({ cartItems: itemsInCart });
    }

    async addItemToCart(req, res) {
        const { userHandle } = req.user;
        const { items } = req.body;
        const results = await addItemToCartForUser(userHandle, items);
        res.send({ cart: results });
    }
}
