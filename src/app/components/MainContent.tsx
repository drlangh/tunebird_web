import { signOut } from '@/auth';

const MainContent = () => {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </>
  );
};

export default MainContent;
