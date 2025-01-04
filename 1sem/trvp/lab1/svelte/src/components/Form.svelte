<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../ui/Button.svelte";
  import Input from "../ui/Input.svelte";

  let location = "";
  let street = "";
  let house = "";
  let apartment = "";

  const submit = (e: any) => {
    e.preventDefault();
    alert(
      `Вы оформили заказ продуктов по адресу г. ${location}, ул. ${street}, дом ${house}, кв. ${apartment}`
    );
  };
</script>

<form class="form-container" on:submit={submit}>
  <h3 class="goods_title">Куда</h3>

  <div class="form-row">
    <Input label="Населенный пункт" bind:value={location} />
    <Input label="Улица" bind:value={street} />
  </div>

  <div class="form-row">
    <Input label="Дом" bind:value={house} />
    <Input label="Квартира" bind:value={apartment} />
  </div>

  <Button onClick={submit}>Заказать</Button>
</form>
