import express, {Express, Request, Response} from "express";
import PEP from "./pep";

const app: Express = express();

app.get("/**", async (req: Request, res: Response) => {
    const pep = new PEP();
    const body = await pep.checkAccess(req);
    res.status(200).json(body);
});

export default app;
