import cookieParser from "cookie-parser";
import express from "express";
const app = express();

import servicesLoader from "./loaders/servicesLoader";
import userRoutes from "./api/routes/userRoutes";
import UserRepository from "./repositories/userRepository";
import UserService from "./services/userService";
import UserController from "./api/controllers/userController";
import { repositoriesLoader } from "./loaders/repositoriesLoader";
import errorMiddleware from "./middlewares/error";
import cors from "cors";
import VendorController from "./api/controllers/vendorController";
import vendorRoutes from "./api/routes/vendorRoutes";
import CustomerController from "./api/controllers/customerController";
import customerRoutes from "./api/routes/customerRoutes";
import CategorieController from "./api/controllers/categorieController";
import categorieRoutes from "./api/routes/categorieRoutes";
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

const repositories = repositoriesLoader();

// Load services
const services = servicesLoader(repositories);

// Create controllers
const userController = new UserController(services.userService);
const vendorController = new VendorController(services.vendorService);
const customerController = new CustomerController(services.customerService);
const categorieController = new CategorieController(services.categorieService);

// Set up routes
app.use("/api/auth", userRoutes(userController));
app.use("/api/vendor", vendorRoutes(vendorController));
app.use("/api/customer", customerRoutes(customerController));
app.use("/api/categorie", categorieRoutes(categorieController));

app.use(errorMiddleware);

export default app;
