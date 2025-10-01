import InstructionBadge from './InstructionBadge';

export default function InstructionsSection(){
  return(
    <div>
      <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold" >Instructions</h3>
      <InstructionBadge />
      <InstructionBadge />
      <InstructionBadge />
    </div>
  );
}