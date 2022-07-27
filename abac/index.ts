import app from "./src/app";

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`⚡️[ABAC]: Server is running at https://localhost:${PORT}`);
});
