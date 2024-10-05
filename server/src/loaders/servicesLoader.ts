// src/loaders/servicesLoader.ts
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import VendorRepository from "../repositories/vendorRepository";
import VendorService from "../services/vendorService";
import CustomerService from "../services/customerService";
import CustomerRepository from "../repositories/customerRepository";
import CategorieService from "../services/categorieService";
import CategorieRepository from "../repositories/categorieRepository";

const servicesLoader = (repositories: {
  userRepository: UserRepository;
  vendorRepository: VendorRepository;
  customerRepository: CustomerRepository;
  categorieRepository: CategorieRepository;
}) => {
  const userService = new UserService(repositories.userRepository);
  const vendorService = new VendorService(repositories.vendorRepository);
  const customerService = new CustomerService(repositories.customerRepository);
  const categorieService = new CategorieService(
    repositories.categorieRepository
  );

  return {
    userService,
    vendorService,
    customerService,
    categorieService,
  };
};

export default servicesLoader;
