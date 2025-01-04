import { Link, Outlet } from "react-router-dom";
import { Button } from "./Button";

export const Layout = () => {
  return (
    <>
      <header>
        <Link to={"/"}>СЕВЕРЯНОЧКА</Link>

        <Link to={"/cart"}>
          <Button isOrange>Корзина</Button>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};
