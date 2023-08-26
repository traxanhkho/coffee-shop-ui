import { classNames } from "@/utils/classNames";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const QuantityToppingForm = ({ fieldIndex, fieldName }) => {
  const { setValue } = useFormContext();
  const [quantity, setQuantity] = useState(0);

  const updateFieldValue = (value) => {
    setValue(`toppings[${fieldIndex}].quantity`, value);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    updateFieldValue(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateFieldValue(newQuantity);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        type="button"
        className={classNames(
          quantity == 0
            ? "bg-gray-400 cursor-default"
            : "bg-orange-400 hover:bg-orange-600",
          "p-2 rounded-full"
        )}
        onClick={handleDecrease}
      >
        <MinusIcon className="h-5 w-5 text-white" />
      </button>
      <input
        defaultValue={0}
        type="number"
        className="hidden"
      />
      <span>{quantity}</span>
      <button
        type="button"
        className="p-2 rounded-full bg-orange-400 hover:bg-orange-600 cursor-pointer"
        onClick={handleIncrease}
      >
        <PlusIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default QuantityToppingForm;
