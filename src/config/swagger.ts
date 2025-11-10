// config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Barcode Generator API",
        version: "1.0.0",
        description: "API for generating barcodes",
      },
      servers: [
        {
          url: "http://localhost:3000", // change when deployed
        },
      ],
    },
    apis: ["./src/routes/**/*.ts"], // adjust path if needed
  };

  const specs = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
