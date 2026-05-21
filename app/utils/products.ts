export interface product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null;
}

export const products: product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 10.99,
    description: "This is product 1",
    image: null,
  },
  {
    id: 2,
    name: "Product 2",
    price: 15.99,
    description: "This is product 2",
    image: null,
  },
];
