import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from "path";

// Routes
import privateRoutes from "./interfaces/routes/privateRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const URL_frontend = process.env.URL_Client || 'http://localhost:5173';

/**
 * Configuración de Swagger para documentación de la API.
 */
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Development',
      version: '1.0.0',
      description: 'API implementada con el patrón de diseño Repository y los principios de Clean Architecture.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/interfaces/routes/*/*.ts'], // Ruta donde están tus controladores y rutas con anotaciones de Swagger
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs,{
  swaggerOptions: {
    url: '/v1/docs/swagger.json',
  },
  customSiteTitle: 'API Node.js Documentación',
}));

// Middleware base
app.use(cors({ origin: URL_frontend,credentials: true },));
app.use(express.json());

// Rutas públicas (autenticación)
// app.use('/api/Session', publicRoutes);

// Archivos estáticos
//app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas privadas
app.use('/api',privateRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/v1/docs`);
});