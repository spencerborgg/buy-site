import { ErrorWithStatus } from "../../utils/errors";
import { orderHistoryDb } from "../repositories/orders";
let loggedIn = true;


export async function fetchOrders(userHandle) {
    if (loggedIn) {
        try {
            const results = await orderHistoryDb(userHandle);
            return results;
        } catch (err) {
            throw new StatusError({ msg: "DB error", status: 500 });
        }
    } else {
        throw new StatusError({ msg: "user not logged in", status: 400 });
    }
}