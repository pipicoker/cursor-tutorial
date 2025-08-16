'use client';

import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Taskmaster Lite</h1>
      <button onClick={handleSignOut} className="text-sm">
        Sign Out
      </button>
    </header>
  );
}
