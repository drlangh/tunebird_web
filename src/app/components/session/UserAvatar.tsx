import { auth } from '@/auth';
import Image from 'next/image';

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="relative w-16 aspect-square rounded-full overflow-hidden">
      <Image
        src={session.user.image}
        alt={session.user.name}
        fill={true}
      />
    </div>
  );
}
