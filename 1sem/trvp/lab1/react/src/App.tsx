import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./ui";
import { Cart, Main } from "./pages";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
