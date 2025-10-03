export default function Header(){

  const handleClick = () => {
    alert('back to home');
  };

  return(
    <header className="flex min-h-18 items-center border-b-1 border-gray-300">
      <h1 className="ml-4 text-xl font-bold text-[var(--brand-dark)] font-display
      cursor-pointer"
      onClick={handleClick}>FridgePal</h1>
    </header>
  );
}