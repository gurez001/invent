// src/loaders/servicesLoader.ts
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import VendorRepository from "../repositories/vendorRepository";
import VendorService from "../services/vendorService";
import CustomerService from "../services/customerService";
import CustomerRepository from "../repositories/customerRepository";
import CategorieService from "../services/categorieService";
import CategorieRepository from "../repositories/categorieRepository";
import ProductService from "../services/productService";
import ProductRepository from "../repositories/productRepository";
import OrderService from "../services/orderService";
import OrderRepository from "../repositories/orderRepository";
import ExpenseRepository from "../repositories/expenseRepository";
import ExpenseService from "../services/expenseServiec";
import PurchaseRepository from "../repositories/purchasesRepository";
import PurchasesService from "../services/purchaeseService";

const servicesLoader = (repositories: {
  userRepository: UserRepository;
  vendorRepository: VendorRepository;
  customerRepository: CustomerRepository;
  categorieRepository: CategorieRepository;
  productRepository: ProductRepository;
  orderRepository: OrderRepository;
  expenseRepository: ExpenseRepository;
  purchaseRepository: PurchaseRepository;
}) => {
  const userService = new UserService(repositories.userRepository);
  const vendorService = new VendorService(repositories.vendorRepository);
  const customerService = new CustomerService(repositories.customerRepository);
  const categorieService = new CategorieService(
    repositories.categorieRepository
  );
  const productService = new ProductService(repositories.productRepository);
  const orderService = new OrderService(repositories.orderRepository);
  const expenseService = new ExpenseService(repositories.expenseRepository);
  const purchaseService = new PurchasesService(repositories.purchaseRepository);

  return {
    userService,
    vendorService,
    customerService,
    categorieService,
    productService,
    orderService,
    expenseService,
    purchaseService,
  };
};

export default servicesLoader;
