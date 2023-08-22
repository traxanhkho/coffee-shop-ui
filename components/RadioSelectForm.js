import React from 'react';
import { useForm, Controller } from 'react-hook-form';

function RadioSelectForm() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Choose an option:</label>
        <div>
          <Controller
            name="radioOption"
            control={control}
            rules={{ required: 'Please select an option' }}
            render={({ field }) => (
              <div>
                <input
                  type="radio"
                  {...field}
                  value="option1"
                  checked={field.value === 'option1'}
                />
                <label>Option 1</label>
                <input
                  type="radio"
                  {...field}
                  value="option2"
                  checked={field.value === 'option2'}
                />
                <label>Option 2</label>
              </div>
            )}
          />
         
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RadioSelectForm;
