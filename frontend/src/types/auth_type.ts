export const columns: any[] = [
  { name: "User id", uid: "user_id" },
  { name: "Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Number", uid: "number" },
  { name: "Role:", uid: "role" },
  { name: "Status", uid: "isActive" },
  { name: "Join at", uid: "updatedAt" },
  { name: "Actions", uid: "actions" }, // Added actions column
];
export const INITIAL_VISIBLE_COLUMNS = [
  "user_id",
  "name",
  "email",
  "number",
  "role",
  "isActive",
  "updatedAt",
  "actions",
];
export interface Login {
  email: string;
  password: string;
}
export interface Sign_up {
  email: string;
  name: string;
  uuid?: string;
  password: string;
}
export interface forgot_password {
  email: string;
}
export interface User_Data {
  token: string;
  email?: string;
  name?: string;
  user_id?: string;
  number?: string;
  role?: string;
  isActive?: string;
}

export interface User_list_props {
  _id?: string;
  email?: string;
  name?: string;
  user_id?: string;
  number?: string;
  role?: string;
  isActive?: string;
  is_delete?: string;
  is_active?: string;
}
