export type FormInputs = {
  username: string;
  member_type: string;
  member: string[];
  product: string[];
  data_type: string[];
  op_rights: string[];
  role: string[];
  portfolio_name: string;
  portfolio_code: string;
  portfolio_status: string;
  portfolio_spec: string;
  portfolio_u_code: string;
  portfolio_det: string;
};

export interface PublicResponse {
  id: string;
}

export interface Option {
  value: string;
  label: string;
}