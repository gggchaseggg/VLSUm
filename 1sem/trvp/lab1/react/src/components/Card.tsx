import { FC, useEffect, useState } from "react";
import { Product } from "../types";
import { Button, Raiting } from "../ui";

type CardProps = {
  product: Product;
};

export const Card: FC<CardProps> = ({
  product: { cost, image, inCart, name, raiting, id },
}) => {
  const [isInCart, setIsInCart] = useState(inCart);

  const addToCart = () => {
    const cart: number[] = JSON.parse(localStorage.getItem("cart") as string);
    if (isInCart) {
      setIsInCart(false);
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => item !== id))
      );
    } else {
      setIsInCart(true);

      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    const cart: number[] = JSON.parse(localStorage.getItem("cart") as string);
    if (cart.includes(id)) setIsInCart(true);
  }, []);

  return (
    <div className="product-card">
      <div className="product-card_image">
        <img src={image} alt={name} />
      </div>
      <div className="product-card_footer">
        <div className="product-card_cost">{cost} ₽</div>
        <div>{name}</div>
        <Raiting starsSelected={raiting} totalStars={5} />
        <Button isOrange={isInCart} onClick={addToCart}>
          В корзину
        </Button>
      </div>
    </div>
  );
};
