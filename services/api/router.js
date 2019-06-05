import fs from "fs";
import path from "path";
import express from "express";

const API_PATH = "./routes/endpoints";

class Routes {
  load(folderName, app) {
    fs.readdirSync(folderName).forEach(file => {
      const fullName = path.join(folderName, file);
      const stat = fs.lstatSync(fullName);

      if (stat.isDirectory()) {
        // Recursively walk-through folders
        this.load(fullName, app);
      } else if (file.toLowerCase().indexOf("controller.js") !== -1) {
        // Grab path to JavaScript file and use it to construct the route
        const fileLocation = fullName.replace("./", "");
        let dirs = path.dirname(fileLocation).split(path.sep);
        const API_PATH_FOLDERS = API_PATH.replace("./", "").split("/");

        API_PATH_FOLDERS.map((f, i) => {
          if (dirs[0].toLowerCase() === f.toLowerCase()) {
            dirs.splice(0, 1);
          }
        });

        const router = express.Router();
        const baseRoute = "/api/" + dirs[0];

        const Controller = require("./" + fullName).default;
        new Controller(router);
        app.use(baseRoute, router);
      }
    });
  }

  setup(app) {
    this.load(API_PATH, app);
  }
}

export default new Routes();
