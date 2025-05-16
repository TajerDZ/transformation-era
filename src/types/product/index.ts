export type ProductGraphql = {
  createdAt: string;
  deleted: boolean;
  deletedAt: string;
  description: string;
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  type: string;
  updatedAt: string;
  plans: {
    id: string;
    name: string;
    description: string;
    details: {
      id: string;
      key: string;
      value: string;
    }[];
    prices: {
      discount: number;
      duration: number;
      id: string;
      key: string;
      value: number;
    }[];
  }[];
};

export type ProductInput = {
  name: string;
  price: number;
  description: string;
  thumbnail: string;
  type: string;
  plans: {
    name: string;
    details: {
      key: string;
      value: string;
    }[];
    prices: {
      key: string;
      value: number;
    }[];
  }[];
};
