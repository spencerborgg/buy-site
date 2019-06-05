import { addItemsToCartForUserInDB, cartHistoryDb } from "../repositories/cart";

export async function fetchCartItems(userHandle) {
    try {
        const results = await cartHistoryDb(userHandle);
        return results;
    } catch (err) {
        throw new StatusError({ msg: "DB error", status: 500 });
    }
}

export async function addItemToCartForUser(userHandle, items) {
    return addItemsToCartForUserInDB(userHandle, items)
}