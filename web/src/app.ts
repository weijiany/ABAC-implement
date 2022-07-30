import express, {Express, Request, Response} from "express";

const app: Express = express();

app.get("/attributes", (req: Request, res: Response) => {
    const data: Record<string, string> = {
        id: req.query.id as string,
        name: "Goudan"
    };

    res.status(200).json(Object.keys(data).map((key: string) => ({
        key,
        value: data[key]
    })));
});

app.get("/hello", (_, res: Response) => res.status(200).send("hello world"));

export default app;
