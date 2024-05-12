export type User = {
  id: number;
  name: string;
  age: number;
  address: string;
  photos: string;
};

export type Coffee = {
  id: number;
  bean: string;
  description: string;
  price: number;
};

export type Distributor = {
  id: number;
  distributor_name: string;
  city: string;
  region: string;
  phone: string;
  email: string;
};

export type Upload = {
  id: number;
  title: string;
  docPath: string;
  author: string;
};
