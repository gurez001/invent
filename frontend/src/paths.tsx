interface Paths {
  crm: {
    purchases: {
      purchases: string;
      purchase_orders: string;
      debit_notes: string;
    };
    product_service: string;
    vendor: string;
    customer: string;
    order: {
      list:string;
      form:string;
    };
  };
}

export const paths: Paths = {
  crm: {
    purchases: {
      purchases: "/crm/list/purchase",
      purchase_orders: "/crm/list/purchase-order",
      debit_notes: "/crm/list/debit-notes",
    },
    order: {
      list: "/crm/orders",
      form: "/crm/orders/form",
    },
    product_service: "/crm/product",
    customer: "/crm/customer",
    vendor: "/crm/vendor",
  },
};
