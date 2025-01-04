export type Product = {
  id: number;
  name: string;
  image: string;
  cost: number;
  raiting: number;
  inCart: boolean;
};

export type ProductsList = {
  id: number;
  title: string;
  products: Product[];
};
