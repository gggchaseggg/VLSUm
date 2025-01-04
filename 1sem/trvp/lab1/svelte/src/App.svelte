<script>
  import { Router, Route, Link } from "svelte-routing";
  import Layout from "./ui/Layout.svelte";
  import Main from "./pages/Main.svelte";
  import Cart from "./pages/Cart.svelte";

  const initializeCart = () => {
    const cart = localStorage.getItem("cart");
    if (!cart) localStorage.setItem("cart", JSON.stringify([]));
  };

  initializeCart();
</script>

<Router>
  <Layout>
    <Route path="/" component={Main} />
    <Route path="cart" component={Cart} />
  </Layout>
</Router>
