import { ErrorWithStatus } from "../../utils/errors";

export async function createItem(item) {
  console.log("new item i want to make", item);
  if (!item) {
    throw new ErrorWithStatus({ msg: "please provide item", status: 400 });
  }
}
