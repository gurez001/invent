import { NextFunction } from "express";
import { generateRandomId } from "../utils/generateRandomId";
import ErrorHandler from "../utils/ErrorHandler";
import Order_details_model from "../models/orderDetails";
import mongoose from "mongoose";

class OrderDetailsRepository {
  async create(data: any, next: NextFunction) {
    const toNumber = (value: any) => (isNaN(Number(value)) ? 0 : Number(value));

    const updated_data: any[] = [];
    data.map((item: any, i: number) => {
      updated_data.push({
        product_id: item.product._id,
        product_name: item.product.name,
        product_selling_price: item.product.selling_price,
        product_primary_unit: item.product.primary_unit,
        product_tax: item.product.tax,
        product_purchase_price: item.product.purchase_price,
        quantity: toNumber(item.quantity),
      });
    });

    

    try {
      const newOrderDetails = new Order_details_model({
        product_details: updated_data, // Wrap in `product_details`
      });

      return await newOrderDetails.save();
    } catch (error: any) {
      return next(new ErrorHandler(error, 404));
    }
  }
}
export default OrderDetailsRepository;
