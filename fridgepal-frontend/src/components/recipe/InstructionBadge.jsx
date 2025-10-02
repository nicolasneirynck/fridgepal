export default function InstructionBadge(){
  return(
    
    <div className="bg-gray-50 border border-[var(--brand-dark)]/20 rounded-xl
                flex items-center p-3 gap-5 mb-3 basis-full">
      <div className="h-8 w-8 bg-[var(--brand-dark)] rounded-full text-white flex items-center justify-center"> 
        <span >1</span></div>
     
      <p className="text-sm text-[var(--brand-gray-dark)]">Instructie</p>
    </div>
  );
}