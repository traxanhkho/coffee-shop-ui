import axios from "axios";
import { useEffect, useState } from "react";
import { classNames } from "@/utils/classNames";
import { useFormContext } from "react-hook-form";
import { useCustomer } from "@/context/CustomerContext";
import { useProduct } from "@/context/ProductContext";

// "http://localhost:5000/api/locationVn"
// "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"

function RenderCity() {
  const {
    register,
    formState: { errors },
    watch,
    resetField,
    setValue,
  } = useFormContext();
  const citisValue = watch("city");
  const districtsValue = watch("district");
  const { locationData } = useProduct();

  return (
    <>
      <div>
        <div
          className={classNames(
            errors["city"]
              ? "border-red-300 focus-within:border-red-500 focus-within:outline-none focus-within:ring-red-500"
              : "focus-within:border-indigo-600 focus-within:ring-indigo-600 focus-within:ring-1 ",
            "relative rounded-md border border-gray-300 px-3 py-2 shadow-sm "
          )}
        >
          <label
            htmlFor={"city"}
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Chọn Tỉnh Thành
          </label>
          <select
            name="city"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("city")}
          >
            <option value="">Vui lòng chọn Tỉnh Thành</option>

            {locationData.length &&
              locationData.map((x) => (
                <option key={x.Id} value={x.Id}>
                  {x.Name}
                </option>
              ))}
          </select>
        </div>

        {errors["city"] && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors["city"].message}
          </p>
        )}
      </div>
      <div>
        <div
          className={classNames(
            errors["district"]
              ? "border-red-300 focus-within:border-red-500 focus-within:outline-none focus-within:ring-red-500"
              : "focus-within:border-indigo-600 focus-within:ring-indigo-600 focus-within:ring-1 ",
            "relative rounded-md border border-gray-300 px-3 py-2 shadow-sm "
          )}
        >
          <label
            htmlFor={"district"}
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Chọn Quận Huyện
          </label>
          <select
            name="district"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("district")}
          >
            <option value="">Vui lòng chọn Quận Huyện</option>

            {locationData.length &&
              citisValue &&
              locationData
                .find((n) => n.Id === citisValue)
                ?.Districts?.map((k) => (
                  <option key={k.Id} value={k.Id}>
                    {k.Name}
                  </option>
                ))}
          </select>
        </div>
        {errors["district"] && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors["district"].message}
          </p>
        )}
      </div>
      <div>
        <div
          className={classNames(
            errors["ward"]
              ? "border-red-300 focus-within:border-red-500 focus-within:outline-none focus-within:ring-red-500"
              : "focus-within:border-indigo-600 focus-within:ring-indigo-600 focus-within:ring-1 ",
            "relative rounded-md border border-gray-300 px-3 py-2 shadow-sm "
          )}
        >
          <label
            htmlFor={"ward"}
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Chọn Phường Xã
          </label>
          <select
            name="ward"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("ward")}
          >
            <option value="">Vui lòng chọn Phường Xã</option>

            {locationData.length &&
              citisValue &&
              locationData
                .find((n) => n.Id === citisValue)
                ?.Districts.find((d) => d.Id === districtsValue)
                ?.Wards.map((w) => (
                  <option key={w.Id} value={w.Id}>
                    {w.Name}
                  </option>
                ))}
          </select>
        </div>
        {errors["ward"] && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors["ward"].message}
          </p>
        )}
      </div>
    </>
  );
}

export default RenderCity;
