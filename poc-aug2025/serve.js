import serve from "serve";

const port = process.env.PORT || 8080;
const server = serve("dist", { port });

