<script>
import { ref } from "vue";
import Button from "../ui/Button.vue";
import Input from "../ui/Input.vue";

export default {
  name: "Form",
  components: {
    Button,
    Input,
  },
  setup() {
    const location = ref("");
    const street = ref("");
    const house = ref("");
    const apartment = ref("");

    const handleLocationChange = (e) => {
      location.value = e.target.value;
    };

    const handleStreetChange = (e) => {
      street.value = e.target.value;
    };

    const handleHouseChange = (e) => {
      house.value = e.target.value;
    };

    const handleApartmentChange = (e) => {
      apartment.value = e.target.value;
    };

    const submit = (e) => {
      e.preventDefault();
      alert(
        `Вы оформили заказ продуктов по адресу: г. ${location.value}, ул. ${street.value}, дом ${house.value}, кв. ${apartment.value}`
      );
    };

    return {
      location,
      street,
      house,
      apartment,
      handleLocationChange,
      handleStreetChange,
      handleHouseChange,
      handleApartmentChange,
      submit,
    };
  },
};
</script>

<template>
  <form class="form-container" @submit="submit">
    <h3 class="goods_title">Куда</h3>

    <div class="form-row">
      <Input
        label="Населенный пункт"
        :value="location"
        @input="handleLocationChange"
      />
      <Input label="Улица" :value="street" @input="handleStreetChange" />
    </div>

    <div class="form-row">
      <Input label="Дом" :value="house" @input="handleHouseChange" />
      <Input
        label="Квартира"
        :value="apartment"
        @input="handleApartmentChange"
      />
    </div>

    <Button @click="submit">Заказать</Button>
  </form>
</template>
