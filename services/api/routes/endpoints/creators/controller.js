import { getCreatorInfo, getCreatorsList } from "../../commands/creators";
import { wrapAsyncFunc } from "../../../utils/wrap-async-route";
import { updateCreator } from "../../commands/nameUpdate";
export default class AuthController {
  constructor(router) {
    router.get("/:id", wrapAsyncFunc(this.creatorSpotlight));
    router.get("/", wrapAsyncFunc(this.creatorsList));
    router.put("/:id", wrapAsyncFunc(this.updateCreatorDetails));
  }

  async updateCreatorDetails(req, res) {
    const { id } = req.params;
    const { creator } = req.body;
    const results = await updateCreator(creator);
    console.log("i am responding to a put request", creator, id, results);
    res.send({ creator: results });
  }

  async creatorSpotlight(req, res) {
    const { id } = req.params;
    console.log("ID", id, req.params);
    const creator = await getCreatorInfo(id);
    res.send({ creator });
  }

  async creatorsList(req, res) {
    const creators = await getCreatorsList();
    res.send({ creators });
  }
}
