import cookieParser from "cookie-parser";
import express from "express";
const app = express();

import cors from "cors";
import { repositoriesLoader } from "./loaders/crm/repositoriesLoader";
import servicesLoader from "./loaders/crm/servicesLoader";
import UserController from "./api/crm/controllers/userController";
import VendorController from "./api/crm/controllers/vendorController";
import CustomerController from "./api/crm/controllers/customerController";
import CategorieController from "./api/crm/controllers/categorieController";
import ProductController from "./api/crm/controllers/productController";
import OrderController from "./api/crm/controllers/orderController";
import ExpenseController from "./api/crm/controllers/expenseController";
import PurchasesController from "./api/crm/controllers/purchasesController";
import userRoutes from "./api/crm/routes/userRoutes";
import vendorRoutes from "./api/crm/routes/vendorRoutes";
import customerRoutes from "./api/crm/routes/customerRoutes";
import categorieRoutes from "./api/crm/routes/categorieRoutes";
import productRoutes from "./api/crm/routes/productRoutes";
import orderRoutes from "./api/crm/routes/orderRoutes";
import expenseRoutes from "./api/crm/routes/expenseRoutes";
import purchaseRoutes from "./api/crm/routes/purchaseRoutes";
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

const repositories = repositoriesLoader();

// Load services
const services = servicesLoader(repositories);

// Create controllers
const userController = new UserController(services.userService);
const vendorController = new VendorController(services.vendorService);
const customerController = new CustomerController(services.customerService);
const categorieController = new CategorieController(services.categorieService);
const productController = new ProductController(services.productService);
const orderController = new OrderController(services.orderService);
const expenseController = new ExpenseController(services.expenseService);
const purchasesController = new PurchasesController(services.purchaseService);

// Set up routes
app.use("/api/auth", userRoutes(userController));
app.use("/api/vendor", vendorRoutes(vendorController));
app.use("/api/customer", customerRoutes(customerController));
app.use("/api/categorie", categorieRoutes(categorieController));
app.use("/api/product", productRoutes(productController));
app.use("/api/order", orderRoutes(orderController));
app.use("/api/expense", expenseRoutes(expenseController));
app.use("/api/purchase", purchaseRoutes(purchasesController));

app.use(errorMiddleware);

export default app;
