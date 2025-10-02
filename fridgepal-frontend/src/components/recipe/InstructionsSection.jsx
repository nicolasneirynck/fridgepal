import InstructionBadge from './InstructionBadge';

export default function InstructionsSection(){
  return(
    <div className='basis-95 grow max-w-200 mr-5'>
      <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold" >Instructions</h3>
      <InstructionBadge />
      <InstructionBadge />
      <InstructionBadge />
    </div>
  );
}