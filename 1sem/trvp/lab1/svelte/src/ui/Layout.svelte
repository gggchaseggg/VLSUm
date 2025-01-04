<script>
  import { Link } from "svelte-routing";
  import Button from "./Button.svelte";
</script>

<header>
  <Link to="/">СЕВЕРЯНОЧКА</Link>
  <Link to="/cart">
    <Button isOrange>Корзина</Button>
  </Link>
</header>

<main>
  <slot />
</main>

<footer>footer</footer>
