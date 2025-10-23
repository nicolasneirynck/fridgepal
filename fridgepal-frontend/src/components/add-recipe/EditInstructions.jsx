import { useState,useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function EditInstructions() {

  const { watch,register,setValue,formState: { errors },clearErrors}= useFormContext();
  const formInstructions = watch('instructions') || [];
  const [instructions, setInstructions] = useState(
    formInstructions.length > 0 ? formInstructions : [{ stepNumber: 1, description: '' }],
  );

  // TODO juist gebruik useEffect?
  useEffect(() => {
 
    if (formInstructions.length > 0 && instructions.length === 1 && !instructions[0].description) {
      setInstructions(formInstructions);
    }
  }, [formInstructions]);

  // TODO juist gebruik useEffect?
  useEffect(() => {
    register('instructions', {
      validate: (value) =>
        value && value.length > 0 && value.some((s) => s.description.trim()) ||
        'Voeg minstens één instructie toe',
    });
  }, [register]);

  //TODO juist gebruik useEffect?
  useEffect(() => {
    setValue('instructions', instructions);
  }, [instructions, setValue]);

  function addStep() {
    setInstructions([
      ...instructions,
      { stepNumber: instructions.length + 1, description: '' },
    ]);
    clearErrors('instructions');
  }

  function updateInstruction(index, newValue) {
    setInstructions((prev) =>
      prev.map((step, i) =>
        i === index ? { ...step, description: newValue } : step,
      ),
    );
  }

  function deleteStep(index) {
    setInstructions((prev) => {
      if (prev.length === 1) return prev; 
      const updated = prev.filter((_, i) => i !== index);
      // hernummeren
      return updated.map((step, i) => ({
        ...step,
        stepNumber: i + 1,
      }));
    });
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
