import React from "react";

interface RatingSubCompProps {
  rating: number;
}

const RatingSubComp = (props: RatingSubCompProps) => {
  return (
    <div className="rating">
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value={1}
        disabled
        defaultChecked={props.rating === 1}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value={2}
        disabled
        defaultChecked={props.rating === 2}
      />

      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value={3}
        disabled
        defaultChecked={props.rating === 3}
      />

      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value={4}
        disabled
        defaultChecked={props.rating === 4}
      />

      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value={5}
        disabled
        defaultChecked={props.rating === 5}
      />
    </div>
  );
};

export default RatingSubComp;
