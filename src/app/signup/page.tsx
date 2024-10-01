'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Magic } from 'magic-sdk';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        toast({
          title: 'Signup successful!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/dashboard'); // Redirect to the dashboard after signup
      } else {
        toast({
          title: 'Signup failed!',
          description: 'Unable to complete signup.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Signup error!',
        description: 'An error occurred during signup.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.100"
      py={10}
    >
      <VStack
        as="form"
        onSubmit={handleSignup}
        bg="white"
        rounded="lg"
        boxShadow="lg"
        p={8}
        spacing={6}
        w="full"
        maxW="md"
      >
        <Heading as="h1" size="lg" textAlign="center">
          Sign Up
        </Heading>
        <Text color="gray.600" textAlign="center">
          Enter your email to receive a Magic Link for signup.
        </Text>

        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor="teal.400"
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="lg"
          w="full"
          type="submit"
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}
