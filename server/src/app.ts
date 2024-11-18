import cookieParser from "cookie-parser";
import express from "express";
const app = express();
import cors from "cors";
import errorMiddleware from "./middlewares/error";
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://inventory-7773.vercel.app"], // Allow only your frontend to access the API
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    exposedHeaders: "Set-Cookie",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
      "cookies",
    ],
    credentials: true, // Allow sending cookies and other credentials
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
);
//-----loaders
import crm_repositoriesLoader from "./loaders/crm/repositoriesLoader";
import crm_servicesLoader from "./loaders/crm/servicesLoader";
import crm_controllersLoader from "./loaders/crm/controllersLoader";
import crm_routesLoader from "./app-routes/crm-Loader";
const crm_repositories = crm_repositoriesLoader();
const crm_services = crm_servicesLoader(crm_repositories);

// Initialize Controllers
const crm_controllers = crm_controllersLoader(crm_services);
crm_routesLoader(app, crm_controllers);

app.use(errorMiddleware);

export default app;
