import React from "react";
import QuantityToppingForm from "./common/QuantityToppingForm";
import PriceFormmater from "./common/PriceFormmater";

const ToppingSelector = ({ topping , fieldIndex }) => {

  return (
    <div className="flex justify-between items-center">
      <div>
        <p>{topping.name}</p>
        <div>
          <PriceFormmater priceInVND={topping.price} hasSymbol="+" />
        </div>
      </div>
      <QuantityToppingForm fieldIndex={fieldIndex} fieldName={topping.name}/>
    </div>
  );
};

export default ToppingSelector;
