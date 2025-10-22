import { useState,useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function EditInstructions() {
  const [instructions, setInstructions] = useState([
    { stepNumber: 1, description: '' },
  ]);

  const { setValue } = useFormContext();

  //TODO juist gebruik useEffect?
  useEffect(() => {
    setValue('instructions', instructions);
  }, [instructions, setValue]);

  function addStep() {
    setInstructions([
      ...instructions,
      { stepNumber: instructions.length + 1, description: '' },
    ]);
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
              required
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
