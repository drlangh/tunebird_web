import { signOut } from '@/auth';
import { Suspense } from 'react';

const MainContent = () => {
  return (
    <Suspense>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </Suspense>
  );
};

export default MainContent;
