import { convertTaxToNumber } from "@/lib/service/convertTaxToNumber";
import { formatCurrency } from "@/lib/service/currencyUtils";
import {
  additional_props,
  purchase_product_list_props,
} from "@/types/Purchase_type";
import React, { useState } from "react";
interface TotalCalProps {
  product_list: purchase_product_list_props[];
  additional_number_data: additional_props[];
}
const Total_cal: React.FC<TotalCalProps> = ({
  product_list,
  additional_number_data,
}) => {
    // conat [aditional_charge] = useState([])
  const data = product_list.reduce(
    (acc: any, { net_amount = 0, total = 0, discount = 0 }) => {
      return {
        Taxable_Amount: acc.Taxable_Amount + net_amount, // Accumulate net_amount
        total_tax: acc.total_tax + (total - net_amount), // Calculate and accumulate tax
        total: acc.total + total, // Accumulate total
        total_discount: acc.total_discount + discount, // Accumulate discount
      };
    },
    { Taxable_Amount: 0, total_tax: 0, total: 0, total_discount: 0 }
  ); // Initial values

  return (
    <>
      {additional_number_data.map((item: any) => {
        const withoutTax = item.withoutTax;
        const withTax = item.withTax;
        return withoutTax > 0 ? (
          <div className="flex justify-end">
            <div className="w-52">
              <p className="py-2">
                {item.label}{" "}
                <span>{withTax < withoutTax ? null : item.tax}</span>
              </p>
            </div>
            <div className="w-36">
              <p className="py-2">
                {withTax > withoutTax ? withTax : withoutTax}
              </p>
            </div>
          </div>
        ) : null;
      })}
      <div className="flex justify-end">
        <div className="w-52">
          <p className="py-2">Taxable Amount</p>
          <p className="py-2">Total Tax</p>
          <p className="py-2">Total Amount</p>
          <p className="py-2">Total Discount</p>
        </div>
        <div className="w-36">
          <p className="py-2">
            {/* {formatCurrency(data.Taxable_Amount + (additional_data.withoutTax > (withTax || 0) ? additional_data.withoutTax : (withTax || 0)))} */}
          </p>
          <p className="py-2">{formatCurrency(data.total_tax)}</p>
          <p className="py-2">{formatCurrency(data.total_tax)}</p>
          <p className="py-2">
            {formatCurrency(
              isNaN(data.total_discount) ? 0 : data.total_discount
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Total_cal;