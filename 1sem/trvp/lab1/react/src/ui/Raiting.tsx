import React, { FC, useState } from "react";

type StarProps = {
  selected?: boolean;
  onClick?: (a: any) => any;
};

const Star: FC<StarProps> = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick}></div>
);

type RaitingProps = {
  starsSelected: number;
  totalStars?: number;
  onRate?: (a: any) => any;
};

export const Raiting: FC<RaitingProps> = ({
  starsSelected,
  totalStars = 5,
  onRate = (f) => f,
}) => {
  const [stars, setStars] = useState(starsSelected);

  const clickStar = (i: number) => {
    onRate(i + 1);
    setStars(i + 1);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star key={i} selected={i < stars} onClick={() => clickStar(i)} />
      ))}
    </div>
  );
};
