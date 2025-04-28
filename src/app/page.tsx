import Form from '@/components/Form';
import Image from 'next/image';
import './globals.css';

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-br from-[#000000] to-[#3533cd]">
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[300px] mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Rainmaker AI"
            width={300}
            height={150}
            className="animate-slideIn object-contain mx-auto"
            priority
          />
        </div>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 text-center">
          We turn your problems into intelligent solutions with the power of AI.
        </p>

        <div className="w-full max-w-2xl">
          <Form />
        </div>
      </div>
    </main>
  );
}
