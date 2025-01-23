import Image from 'next/image';

export default function Home() {
  return (
    <div className="gradient-background w-screen h-screen">
      <div className="flex justify-center items-center gap-6">
        <Image
          src="/logos/tunebird_white.webp"
          alt="Logo"
          width={150}
          height={150}
        />

        <p className="fonarto text-center text-8xl">Tunebird</p>
      </div>
    </div>
  );
}
