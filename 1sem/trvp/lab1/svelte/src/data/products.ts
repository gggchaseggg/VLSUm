import type { ProductsList } from "../types";

const cart: number[] = JSON.parse(localStorage.getItem("cart") as string);

export const PRODUCTS_LIST: ProductsList[] = [
  {
    id: 1,
    title: "Новинки",
    products: [
      {
        id: 1,
        name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
        image:
          "https://media.ovkuse.ru/images/recipes/2e88e9b5-0c6a-408f-b2c9-cbfb134c88c0/2e88e9b5-0c6a-408f-b2c9-cbfb134c88c0.jpg",
        cost: 599.99,
        raiting: 2,
        inCart: cart.includes(1),
      },
      {
        id: 2,
        name: "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан",
        image:
          "https://img.vkusvill.ru/pim/images/site_LargeWebP/12fb4f02-70f2-45d9-90e9-fafb8690f462.webp?1681980970.1568",
        cost: 44.5,
        raiting: 5,
        inCart: cart.includes(2),
      },
      {
        id: 3,
        name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
        image:
          "https://goldniva.ru/upload/iblock/4fc/4fc8912eb5235f47ad47b0bbb3591a65.png",
        cost: 159.99,
        raiting: 2,
        inCart: cart.includes(3),
      },
      {
        id: 4,
        name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
        image:
          "https://www.cherkizovo.ru/upload/iblock/de7/de70df1111b19f702905fc2ddec98136.jpg",
        cost: 49.39,
        raiting: 2,
        inCart: cart.includes(4),
      },
    ],
  },
  {
    id: 2,
    title: "Покупали раньше",
    products: [
      {
        id: 5,
        name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
        image:
          "https://www.cherkizovo.ru/upload/iblock/de7/de70df1111b19f702905fc2ddec98136.jpg",
        cost: 49.39,
        raiting: 2,
        inCart: cart.includes(5),
      },
      {
        id: 6,
        name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
        image:
          "https://media.ovkuse.ru/images/recipes/2e88e9b5-0c6a-408f-b2c9-cbfb134c88c0/2e88e9b5-0c6a-408f-b2c9-cbfb134c88c0.jpg",
        cost: 599.99,
        raiting: 2,
        inCart: cart.includes(6),
      },
      {
        id: 7,
        name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
        image:
          "https://goldniva.ru/upload/iblock/4fc/4fc8912eb5235f47ad47b0bbb3591a65.png",
        cost: 159.99,
        raiting: 2,
        inCart: cart.includes(7),
      },
      {
        id: 8,
        name: "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан",
        image:
          "https://img.vkusvill.ru/pim/images/site_LargeWebP/12fb4f02-70f2-45d9-90e9-fafb8690f462.webp?1681980970.1568",
        cost: 44.5,
        raiting: 5,
        inCart: cart.includes(8),
      },
    ],
  },
];
