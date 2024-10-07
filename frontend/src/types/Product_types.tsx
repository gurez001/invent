export interface product_type_form {
  name?: string;
  status?: string;
  selling_price?: number;
  tax?: string;
  primary_unit?: string;
  sku?: string;
  hsn?: string;
  purchase_price?: number;
  categorie?: string;
  total_quantity?: number;
  barcode?: string;
  weight?: number;
  depth?: number;
  width?: number;
  height?: number;
}

export interface product_type_props {
  title?: string;
  // status?: string
  collection?: string;
  category?: string;
  brand?: string;
  sku?: string;
  // product_type?: string
  barcode?: string;
  weight?: number;
  quantity?: number;
  volume?: number;
  depth?: number;
  width?: number;
  height?: number;
}
// export interface product_Options_type_props {
//     _id: number;
//     title: string;
// }
