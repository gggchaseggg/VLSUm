import { FC } from "react";
import { ProductsList } from "../types";
import { Card } from "./Card";

type GoodsProps = {
  productLists: ProductsList[];
};

export const Goods: FC<GoodsProps> = ({ productLists }) => {
  return (
    <>
      {productLists.map(({ title, products }) => (
        <div key={title} className="goods">
          <h3 className="goods_title">{title}</h3>
          <div className="goods_products">
            {products.map((product) => (
              <Card product={product} key={product.name + product.cost} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
