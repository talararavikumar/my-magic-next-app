// app/auth/verify/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailLink, isSignInWithEmailLink } from 'firebase/auth';
import { Box, Input, Button, Text } from '@chakra-ui/react';
import { auth } from '@/app/lib/firebase';

export default function Verify() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const verifyEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const storedEmail = window.localStorage.getItem('emailForSignIn');
        if (storedEmail) {
          setEmail(storedEmail);
          try {
            await signInWithEmailLink(auth, storedEmail, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            setMessage('You have been successfully signed in.');
            router.push('/dashboard');
          } catch (error) {
            setMessage(`Error: ${error.message}`);
          }
        } else {
          setShowInput(true); // Prompt user to enter email if not stored
        }
      }
    };

    verifyEmailLink();
  }, [router]);

  const handleSubmit = async () => {
    try {
      await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      router.push('/dashboard');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      {showInput ? (
        <>
          <Text mb={4}>Enter your email to verify:</Text>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
          <Button colorScheme="blue" onClick={handleSubmit}>Verify Email</Button>
        </>
      ) : (
        <Text>{message}</Text>
      )}
    </Box>
  );
}
