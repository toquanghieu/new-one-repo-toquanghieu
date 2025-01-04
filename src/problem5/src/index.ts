import app from "./infrastructure/express/app";

const port = process.env.API_PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
server.timeout = 10.1 * 60 * 1000;
server.keepAliveTimeout = 10 * 60 * 1000;
