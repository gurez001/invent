// src/loaders/repositoriesLoader.ts

import CategorieRepository from "../repositories/categorieRepository";
import CustomerRepository from "../repositories/customerRepository";
import UserRepository from "../repositories/userRepository";
import VendorRepository from "../repositories/vendorRepository";

export const repositoriesLoader = () => {
  const userRepository = new UserRepository();
  const vendorRepository = new VendorRepository();
  const customerRepository = new CustomerRepository();
  const categorieRepository = new CategorieRepository();
  return { userRepository, vendorRepository,customerRepository,categorieRepository };
};
