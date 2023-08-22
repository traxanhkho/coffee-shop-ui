import _ from "lodash";
import { useFormContext } from "react-hook-form";
import PriceFormmater from "./PriceFormmater";

export default function RadioGroup({
  productSizes,
  selectedSize,
  onSelectSize,
}) {
  const customOrder = ["lớn", "vừa", "nhỏ"];

  const sizes = _.sortBy(productSizes, (obj) => customOrder.indexOf(obj.name));

  return (
    <div>
      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
        {sizes.map((size) => (
          <div key={size._id} className="flex items-center">
            <input
              name="size"
              id={size._id}
              value={size}
              type="radio"
              checked={selectedSize === size}
              onChange={() => onSelectSize(size)}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={size._id}
              className="ml-3 block text-md font-medium text-gray-700"
            >
              {size.name}
            </label>
            <div className="ml-2 text-sm">
              <PriceFormmater priceInVND={size.price} hasSymbol="+" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
