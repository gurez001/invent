import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import CustomerController from "../controllers/customerController";

const customerRoutes = (customerController: CustomerController) => {
  const router = Router();
  router.post(
    "/add",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    customerController.add_new_customer.bind(customerController)
  ); // Defining vendor route
  router.post(
    "/update",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    customerController.update_details.bind(customerController)
  ); // Defining vendor route
  router.get(
    "/all-customers",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    customerController.all_customers.bind(customerController)
  ); // Defining vendor route
  router.post(
    "/remove/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    customerController.removeCustomer.bind(customerController)
  );
  router.get(
    "/data/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    customerController.get_customer.bind(customerController)
  );
  return router; // Return router so it can be used in app.ts
};

export default customerRoutes;
