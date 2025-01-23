import Google from '@public/logos/google.svg';
import { signIn } from '@/auth';

export default function LoginForm() {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold">
        Sign in to your account
      </h2>

      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/play' });
        }}
      >
        <button className="google mt-8 flex w-full justify-center items-center gap-2 rounded-lg border border-gray-300 p-2 bg-transparent hover:border-2 hover:border-white">
          <Google />
          Continue with Google
        </button>
      </form>

      <div className="flex items-center justify-center mt-4">
        <div className="w-full h-0.5 bg-gray-600"></div>
        <p className="mx-4 text-gray-400">or</p>
        <div className="w-full h-0.5 bg-gray-600"></div>
      </div>

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}
