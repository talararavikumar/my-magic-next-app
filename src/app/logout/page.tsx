'use client';

import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login'); // Redirect to the login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
}
