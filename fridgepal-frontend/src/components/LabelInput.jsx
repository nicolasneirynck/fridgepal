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
    <div className='flex flex-col gap-1 mb-2'>
      <label htmlFor={name} className="text-[var(--brand-gray-dark)] text-sm">
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        name={name}
        type={type}
        disabled={isSubmitting}
        className='bg-[var(--input)] rounded-lg border border-gray-300 
            text-sm p-2 outline-none focus:border-[var(--brand-orange)]'
        placeholder={placeholder}
        {...rest}
      />
      {hasError && <p className="text-red-500 text-sm mt-1" data-cy="label_input_error">{errors[name].message}</p> }
    </div>);
};

export default LabelInput;