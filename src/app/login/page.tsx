'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Magic } from 'magic-sdk';

const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get DID token from Magic
      const didToken = await magic.auth.loginWithMagicLink({ email });

      // Call the login API with the DID token
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      });

      if (res.ok) {
        router.push('/dashboard'); // Redirect to the dashboard after login
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Magic Link</button>
      </form>
    </div>
  );
}
