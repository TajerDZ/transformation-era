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
  type: string;
  domainName: string;
  pricePlans: {
    duration: number;
    id: string;
    key: string;
    value: number;
    discount: number;
  };
  plan: ProductGraphql["plans"][0];
  renewalDate: string;
  status: string;
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
