export interface categorie_form {
  name: string;
  status: string;
  description: string;
  images?: any;
  uuid?: any;
}

export interface categorie_list {
  _id: string;
  name: string;
  audit_log: any;
  descrption: string;
  status: string;
  is_active: string;
  is_delete: string;
  resultPerpage: number;
  data_counter: number;
}

export interface Get_CategorieResponse {
  categorie: categorie_list[]; // Make sure this matches your expected type
  resultPerpage: number; // Add any other properties you expect
  data_counter: number; // Add any other properties you expect
}

export interface Post_CategorieResponse {
  categorie: categorie_list; // Make sure this matches your expected type
}
