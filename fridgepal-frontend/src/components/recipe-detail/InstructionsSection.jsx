export default function InstructionsSection({instructions}){
  
  const InstructionBadge = ({instruction}) => {
    const {stepNumber, description} = instruction;
    return(
    
      <div className="bg-gray-50 border border-[var(--brand-dark)]/20 rounded-xl
                flex items-center p-3 gap-5 mb-3 basis-full">
        <div className="h-8 w-8 bg-[var(--brand-dark)] rounded-full text-white flex items-center justify-center"> 
          <span>{stepNumber}</span>
        </div>
     
        <p className="text-sm text-[var(--brand-gray-dark)]">{description}</p>
      </div>
    );
  };

  return(
    <div>
      <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold mb-5" >Stap-voor-stap</h3>
      {instructions.map((instr) => <InstructionBadge key={instr.id} instruction={instr}/>)}
      
    </div>
  );
}