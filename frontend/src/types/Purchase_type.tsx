export interface purchase_type_props {
  vendor?: string;
  purchase_date?: string;
  due_date?: string;
  reference?: string;
  supplier_invoice_date?: string;
  supplier_invoice_serial_no?: string;
  quantity?: number;
  product_name?: string;
  unit_price?: number;
  price_with_tax?: number;

  net_amount?: number;
  total?: number;
  shipping_charges?: number;
  packaging_charges?: number;
}

export interface purchase_product_list_props {
  key?: string;
  product_name?: string;
  quantity?: number;
  unit_price?: number;
  price_width_text?: number;
  discount?: number;
  net_amount?: number;
  total?: number
}


export interface additional_props {
  tax?: string;
  withoutTax?: number;
  withTax?: number;
  label?: string; 
}

export interface Product_purchase_form_tableprops {
  product_list?: any;
  set_product_list: (value: any[]) => void;
  onSubmit: (data: any) => void;
  additional_number_data: additional_props[],
  set_additional_data:React.Dispatch<React.SetStateAction<additional_props[]>>;
}
export interface Product_purchase_form_table_props {
  product_list?: any;
  set_product_list: (value: any[]) => void;
  additional_number_data: additional_props[],
  set_additional_data:React.Dispatch<React.SetStateAction<additional_props[]>>;
}

export interface Notes_terms {
  [key: string]: any;
}