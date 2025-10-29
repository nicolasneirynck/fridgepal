import { useFormContext } from 'react-hook-form';

export default function EditInstructions() {

  const { watch,setValue,formState: { errors },clearErrors}= useFormContext();
  const instructions = watch('instructions') || [
    { stepNumber: 1, description: '' },
  ];

  function addStep() {
    const updated = [
      ...instructions,
      { stepNumber: instructions.length + 1, description: '' },
    ];
    setValue('instructions', updated, { shouldValidate: true });
    clearErrors('instructions');
  }

  function updateInstruction(index, newValue) {
    const updated = instructions.map((step, i) =>
      i === index ? { ...step, description: newValue } : step,
    );
    setValue('instructions', updated, { shouldValidate: true });
  }

  function deleteStep(index) {
    if (instructions.length === 1) return;
    const updated = instructions
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setValue('instructions', updated, { shouldValidate: true });
  }

  return (
    <div>
      <h1 className="text-[var(--brand-gray-dark)] text-xl mb-2">Instructies</h1>

      {instructions.map((step, index) => (
        <div key={index} className="flex flex-col mt-4">
          <label
            htmlFor={`step-${step.stepNumber}`}
            className="text-[var(--brand-gray-dark)] text-sm mb-1"
          >
            Stap {step.stepNumber}
          </label>
          <div className='flex'>
            <textarea
              id={`step-${step.stepNumber}`}
              name={`step-${step.stepNumber}`}
              value={step.description}
              onChange={(e) => updateInstruction(index, e.target.value)}
              className="bg-[var(--input)] rounded-lg border border-gray-300 
              text-sm p-2 outline-none focus:border-[var(--brand-orange)] w-3/5"
              placeholder="Voer de instructies in..."
            />
            {step.stepNumber > 1 && <button
              type="button"
              onClick={() => deleteStep(index)}
              className="text-gray-400 hover:text-red-500 ml-5"
            >
              ✕
            </button>}
          </div>
          
        </div>
      ))}
      {errors.instructions && (
        <p className="text-red-500 text-sm mt-2">{errors.instructions.message}</p>
      )}
      <button
        type="button"
        onClick={addStep}
        className="mt-4 text-[var(--brand-orange)] hover:text-[var(--brand-dark)]"
      >
        + extra stap
      </button>
    </div>
  );
}
