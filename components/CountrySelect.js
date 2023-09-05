import { useFormContext } from "react-hook-form";
import { classNames } from "@/utils/classNames";
import { useCustomer } from "@/context/CustomerContext";
import { useCallback, useEffect } from "react";

export default function CountrySelect({
  fieldName,
  label,
  setData,
  data,
  resetCountry,
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { currentCustomer } = useCustomer();

  const handleSetCurrentCustomer = useCallback(() => {
    if (!currentCustomer?.address) setValue(fieldName, "");
  }, [currentCustomer, setValue, fieldName]);

  useEffect(() => {
    handleSetCurrentCustomer();
  }, [handleSetCurrentCustomer]);

  const onTagsChange = (event) => {
    resetCountry(fieldName);
    const selectId = event.target.value;

    if (fieldName === "city") {
      const districts = data.find((item) => item.Id === selectId)?.Districts;
      setData(districts);
    } else if (fieldName === "district") {
      const wards = data.find((item) => item.Id === selectId)?.Wards;
      setData(wards);
    }
  };

  return (
    <div>
      <div
        className={classNames(
          errors[{ fieldName }]
            ? "border-red-300 focus-within:border-red-500 focus-within:outline-none focus-within:ring-red-500"
            : "focus-within:border-indigo-600 focus-within:ring-indigo-600 focus-within:ring-1 ",
          "relative rounded-md border border-gray-300 px-3 py-2 shadow-sm "
        )}
      >
        <label
          htmlFor={fieldName}
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          {label}
        </label>
        <select
          name={fieldName}
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          {...register(fieldName, { onChange: onTagsChange })}
        >
          <option value="" disabled>
            Vui lòng chọn {label}
          </option>

          {currentCustomer?.address && (
            <option
              value={currentCustomer.address[fieldName].id}
              className="hidden"
            >
              {currentCustomer.address[fieldName].name}
            </option>
          )}

          {data?.map((location) => (
            <option key={location.Id} value={location.Id}>
              {location.Name}
            </option>
          ))}
        </select>
      </div>

      {errors[fieldName] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[fieldName].message}
        </p>
      )}
    </div>
  );
}
