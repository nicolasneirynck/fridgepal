export default function StepsBar({currentStep}){
  return(
    <div className="flex justify-between w-full">
      <div className='flex flex-col items-center'>
        <div className="p-5 h-10 w-10 flex justify-center items-center 
        border-2 border-[var(--brand-dark)] rounded-full">
          <span className={`text-lg ${currentStep===1?'text-[var(--brand-dark)]':'text-[var(--brand-gray-light)]'}`}>
            1</span>
        </div>
        <div className='mt-1 text-center text-sm text-[var(--brand-gray-light)]'>Details</div>
      </div>
      <div className='flex flex-col items-center'>
        <div className="p-5 h-10 w-10 flex justify-center items-center 
        border-2 border-[var(--brand-gray-light)] rounded-full">
          <span className={`text-lg ${currentStep===2?'text-[var(--brand-dark)]':'text-[var(--brand-gray-light)]'}`}>
            2</span>
        </div>
        <div className='mt-1 text-center text-sm text-[var(--brand-gray-light)]'>Ingrediënten</div>
      </div>
      <div className='flex flex-col items-center'>
        <div className="p-5 h-10 w-10 flex justify-center items-center 
        border-2 border-[var(--brand-gray-light)] rounded-full">
          <span className={`text-lg ${currentStep===3?'text-[var(--brand-dark)]':'text-[var(--brand-gray-light)]'}`}>
            3</span>
        </div>
        <div className='mt-1 text-center text-sm text-[var(--brand-gray-light)]'>Instructies</div>
      </div>
    </div>
  );
}