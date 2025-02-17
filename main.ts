import { app } from "./src/http/app";
import { env } from "./src/config/env";

app
  .listen({
    port: Number(env.NODE_PORT),
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running in localhost ${env.NODE_PORT} 🚀`);
  });
