import { NextFunction } from "express";
import ErrorHandler from "../ErrorHandler";

class ValidateClass {
  // Validate Pin Code length and format
  validatePinCode(pinCode: string, next: NextFunction): boolean {
    const pinCodeNumber = parseInt(pinCode, 10);

    // Check if pinCode is a number and if it's a valid 6-digit code
    if (
      isNaN(pinCodeNumber) ||
      pinCodeNumber < 100000 ||
      pinCodeNumber > 999999
    ) {
      next(new ErrorHandler("Pincode must be a valid 6-digit number.", 400));
      return false;
    }
    return true;
  }
}
const validator = new ValidateClass();
export default validator;
