// app/auth/signin/page.tsx
'use client';

import { useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Box, Input, Button, Text } from '@chakra-ui/react';
import { auth } from '@/app/lib/firebase';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleSendLink = async () => {
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/verify`, // The URL that the user will be redirected to after they sign in
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email); // Store email for verification
      setMessage('A sign-in link has been sent to your email.');
    } catch (error) {
      setMessage(`Error sending link: ${error.message}`);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Text fontSize="2xl" mb={4}>Sign In with Email</Text>
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleSendLink}>Send Sign-In Link</Button>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
}
