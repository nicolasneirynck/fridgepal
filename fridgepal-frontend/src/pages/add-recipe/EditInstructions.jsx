import { useFieldArray,useFormContext } from 'react-hook-form';

export default function EditInstructions() {
   
  // control object van React Hook Form die alle velden intern bijhoudt
  const { control, register, formState:{errors} } = useFormContext();
  // control aan useFieldArray geven, zo weet ie tot welke form de array hoort
  const { fields, append, remove } = useFieldArray({ control, name: 'instructions' }); 
  // fields -> array van objectjes
  // append -> toevoegen aan array, remove -> verwijderen van

  function addStep() {
    append({ stepNumber: fields.length + 1, description: '' });
  }

  return (
    <div>
      <h1 className="text-[var(--brand-gray-dark)] text-xl mb-2">Instructies</h1>

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col mt-4">
          <label className="text-[var(--brand-gray-dark)] text-sm mb-1">
            Stap {index + 1}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <textarea
              {...register(`instructions.${index}.description`, {
                validate: (v) =>
                  (v && v.trim().length > 0) || 'Vul een beschrijving in',
              })}
              className="bg-[var(--input)] rounded-lg border border-gray-300 
                         text-sm p-2 outline-none focus:border-[var(--brand-orange)] w-full sm:w-3/5
                        h-28 sm:h-32 resize-none"
              placeholder="Voer de instructies in..."
              data-cy={`instruction${index}-input`}
            />
            {index > 0 && (
              // TODO remove button in testing
              <button
                type="button"
                onClick={() => remove(index)}
                className="self-start sm:self-center text-gray-400 hover:text-red-500 px-2"
              >
                ✕
              </button>
            )}
          </div>
          {errors?.instructions?.[index]?.description && (
            <p className="text-red-500 text-sm mt-1"
              data-cy="instruction_error">
              {errors.instructions[index].description.message}
            </p>
          )}
        </div>
      ))}
      {errors.instructions && (
        <p className="text-red-500 text-sm mt-2">{errors.instructions.message}</p>
      )}
      {/* TODO enkel mogelijkheid toe te voegen indien de eerdere stappen al invoer hebben */}
      <button
        type="button"
        onClick={addStep}
        className="mt-4 text-[var(--brand-orange)] hover:text-[var(--brand-dark)]"
        data-cy="next-instruction"
      >
        + extra stap
      </button>
    </div>
  );
}
