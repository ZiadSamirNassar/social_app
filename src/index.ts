import express from "express";
import { pootstrap } from "./app.controller";
import config from "./config/dev.config";
const port = config.PORT;
const app = express();

pootstrap(app, express);

app.listen(port, () => {
    console.log(`Server is running on url : http://127.0.0.1:${port} 🚀`);
});
