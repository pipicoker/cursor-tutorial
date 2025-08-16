'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await signIn({ email, password });

    if (error) {
      setError(error.message);
    } else {
      // Handle successful sign in, e.g., redirect to dashboard
      console.log('Signed in successfully:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full p-2 bg-primary text-primary-foreground rounded">
        Sign In
      </button>
      {error && <p className="text-destructive">{error}</p>}
    </form>
  );
}
