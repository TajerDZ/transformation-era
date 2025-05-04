export type UserGraphql = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  thumbnail: string;
  phone: string;
  role: string;
  activation: boolean;
  emailVerify: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type UserInput = {
  firstname: string;
  lastname: string;
  email: string;
  thumbnail: string;
  phone: string;
  role: string;
  password: string;
};
