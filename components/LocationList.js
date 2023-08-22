import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

function LocationList({ name, data, activeStep , handleOnChange }) {
  const { control } = useFormContext();

  console.log(data);
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `Please select a ${name}` }}
      render={({ field }) => (
        <div>
          {data?.map((item) => (
            <div key={item.Id}>
              <input
                type="radio"
                id={`${name}_${item.Id}`}
                onChange={handleOnChange}
                {...field}
                value={item.Id}
                checked={field.value === item.Id}
              />
              <label htmlFor={`${name}_${item.Id}`}>{item.Name}</label>
            </div>
          ))}
        </div>
      )}
    />
  );
}

export default LocationList;
