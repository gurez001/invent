import React from "react";
import { Order_form } from "./Order_form";
import { Form_sidebar } from "./Form_sidebar";

const Order = () => {
  return (
    <>
      <div className="flex gap-2">
        <div className="w-[70%]">
          <Order_form />
        </div>
        <div className="w-[30%]">
          <Form_sidebar />
        </div>
      </div>
    </>
  );
};

export default Order;
