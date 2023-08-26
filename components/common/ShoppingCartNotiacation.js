import React from "react";
import PriceFormmater from "./PriceFormmater";

function ShoppingCartNotiacation({ cartItem }) {
  return (
    <div className="text-[14px] mt-2 relative border-b border-gray-200">
      <h4 className="font-semibold">{`${cartItem.productQuantity} x ${cartItem.name}`}</h4>
      <p className="capitalize">{`Size: ${cartItem.size?.name}`}</p>

      {cartItem.toppings.map((topping) => {
        if (!topping.quantity) return;
        return (
          <p key={topping._id}>{`+ ${topping.name} x ${topping.quantity}`}</p>
        );
      })}

      <div className="absolute text-[16px] right-0 top-1/2 transform -translate-y-1/2">
        <PriceFormmater priceInVND={cartItem.totalAmount} />
      </div>
    </div>
  );
}

export default ShoppingCartNotiacation;
