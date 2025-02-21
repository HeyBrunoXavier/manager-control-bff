import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

/** API-ROUTES */
import { authenticationRoute } from "./routes/authentication.route";
import { stockRoute } from "./routes/stock.route";
import { projectRoute } from "./routes/project.route";
import { workOrderRoute } from "./routes/work-order.route";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
  methods: "*",
  allowedHeaders: "Content-Type,Authorization",
  exposedHeaders: "Authorization",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(authenticationRoute, {
  prefix: "v1/auth",
});

app.register(stockRoute, {
  prefix: "v1/stock",
});

app.register(projectRoute, {
  prefix: "v1/project",
});

app.register(workOrderRoute, {
  prefix: "v1/work-order",
});
