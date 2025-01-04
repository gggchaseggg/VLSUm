import React, { SyntheticEvent, useState } from "react";
import { Button, Input } from "../ui";

export const Form = () => {
  const [location, setLocation] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHouse(e.target.value);
  };

  const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApartment(e.target.value);
  };

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    alert(
      `Вы оформили заказ продуктов по адресу г. ${location}, ул. ${street}, дом ${house}, кв. ${apartment}`
    );
  };

  return (
    <form className="form-container">
      <h3 className="goods_title">Куда</h3>

      <div className="form-row">
        <Input
          label="Населенный пункт"
          value={location}
          onChange={handleLocationChange}
        />

        <Input label="Улица" value={street} onChange={handleStreetChange} />
      </div>

      <div className="form-row">
        <Input label="Дом" value={house} onChange={handleHouseChange} />

        <Input
          label="Квартира"
          value={apartment}
          onChange={handleApartmentChange}
        />
      </div>
      <Button onClick={submit}>Заказать</Button>
    </form>
  );
};
