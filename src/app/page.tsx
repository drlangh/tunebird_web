import Tunebird from '@public/logos/tunebird.svg';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full justify-center items-center max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Tunebird className="text-white w-44" />
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
