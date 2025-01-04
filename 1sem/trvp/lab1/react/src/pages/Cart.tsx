import { Card, Form } from "../components";
import { PRODUCTS_LIST } from "../data";
import { Product } from "../types";

export const Cart = () => {
  const cart: number[] = JSON.parse(localStorage.getItem("cart") as string);
  let cartItems: Product[] = [];
  PRODUCTS_LIST.forEach(({ products }) => cartItems.push(...products));

  cartItems = cartItems.filter(({ id }) => cart.includes(id));

  return (
    <div className="cart">
      <div className="cart_products">
        {cartItems.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>
      <div className="cart_delivery">
        <Form />
      </div>
    </div>
  );
};
