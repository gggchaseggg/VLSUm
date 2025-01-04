import { Goods } from "../components";
import { PRODUCTS_LIST } from "../data";

export const Main = () => {
  return (
    <>
      <Goods productLists={PRODUCTS_LIST} />
    </>
  );
};
