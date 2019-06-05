import { wrapAsyncFunc } from "../../../utils/wrap-async-route";
import { fetchOrders } from "../../commands/orders";


export default class OrderController {

    constructor(router) {
        router.get("/user", wrapAsyncFunc(this.getOrderHistory));
    }

    async getOrderHistory(req, res) {
        const { userHandle } = req.user;
        const orderHistory = await fetchOrders(userHandle);
        res.send({ orders: orderHistory });
    }
}

