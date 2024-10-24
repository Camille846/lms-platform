import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex items-center flex-col">
      <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        <span className="text-lg text-center font-bold ml-4 mt-4">Soul Voices Hub</span>
    </div>
  );
}


