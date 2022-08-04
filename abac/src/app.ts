import express, {Express, Request, Response} from "express";
import {PEP} from "./pep";
import path from "path";

const app: Express = express();
const pep = new PEP(path.join(__dirname, "../.."));

app.get("/**", async (req: Request, res: Response) => {
    const body = await pep.checkAccess(req);
    res.status(200).json(body);
});

export default app;
