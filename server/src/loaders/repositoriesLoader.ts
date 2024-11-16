// src/loaders/repositoriesLoader.ts

import CategorieRepository from "../repositories/categorieRepository";
import CustomerRepository from "../repositories/customerRepository";
import ExpenseRepository from "../repositories/expenseRepository";
import OrderRepository from "../repositories/orderRepository";
import ProductRepository from "../repositories/productRepository";
import PurchaseRepository from "../repositories/purchasesRepository";
import UserRepository from "../repositories/userRepository";
import VendorRepository from "../repositories/vendorRepository";

export const repositoriesLoader = () => {
  const userRepository = new UserRepository();
  const vendorRepository = new VendorRepository();
  const customerRepository = new CustomerRepository();
  const categorieRepository = new CategorieRepository();
  const productRepository = new ProductRepository();
  const orderRepository = new OrderRepository();
  const expenseRepository = new ExpenseRepository();
  const purchaseRepository = new PurchaseRepository();
  return {
    userRepository,
    vendorRepository,
    customerRepository,
    categorieRepository,
    productRepository,
    orderRepository,
    expenseRepository,
    purchaseRepository,
  };
};
