import { ProductGraphql } from "../product";
import { UserGraphql } from "../user";

export type OrderGraphql = {
  createdAt: string;
  deleted: boolean;
  deletedAt: string;
  id: string;
  section: string;
  updatedAt: string;
  product: ProductGraphql;
  user: UserGraphql;
  price: number;
  domainName: string;
  pricePlans: {
    id: string;
    key: string;
    value: number;
    discount: number;
    duration: number;
    link: string;
  };
  plan: ProductGraphql["plans"][0];
  renewalDate: string;
  status: string;
  timeLine: {
    id: string;
    type: string;
    createdAt: string;
    status: string;
    price: number;
    duration: number;
    renewalDate: string;
    plan: {
      id: string;
      name: string;
    };
    pricePlan: {
      id: string;
      key: string;
      value: number;
      discount: number;
      duration: number;
    };
  }[];
  updated: boolean;
};

export type OrderInput = {
  idPlan: string;
  idPrice: string;
  idProduct: string;
  idUser: string;
  price: number;
  section: string;
  status: string;
};

export type InvoiceGraphql = {
  id: string;
  numberInvoice: string;
  date: string;
  file: string;
  totalPrice: number;
  user: UserGraphql;
  createdAt: string;
  updatedAt: string;
};
