import express, {Express, Request, Response} from "express";

const app: Express = express();

app.get("/users", (req: Request, res: Response) => {
    res.status(200).json({
        id: req.query.id,
        name: "Goudan"
    });
});

export default app;
