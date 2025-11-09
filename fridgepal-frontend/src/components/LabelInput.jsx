import { useFormContext } from 'react-hook-form';

const LabelInput  = ({
  label,
  name,
  placeholder,
  type,
  validationRules,
  ...rest
}) => {
  const {
    register,
    formState: { errors , isSubmitting},
  } = useFormContext();
  
  const hasError = name in errors;

  return (
    <div className='mb-3'>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        name={name}
        type={type}
        disabled={isSubmitting}
        className='rounded bg-white p-1
         text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300
          focus:outline-blue-600 w-full  dark:bg-gray-800 dark:text-white'
        placeholder={placeholder}
        {...rest}
      />
      {hasError && <p className="text-red-500 text-sm mt-1" data-cy="label_input_error">{errors[name].message}</p> }
    </div>);
};

export default LabelInput;