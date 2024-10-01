import { ChakraProvider, Button, Box, Flex, Spacer } from '@chakra-ui/react';
import Link from '../../node_modules/next/link';
import Logout from './logout/page';
import { verifyToken } from './utils/auth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the user is authenticated
  const user = verifyToken();

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Box p={4} bg="gray.100" shadow="md">
            <Flex maxW="1200px" mx="auto" align="center">
              <Box>
                <Link href="/">
                  <Button colorScheme="teal" variant="link">
                    Home
                  </Button>
                </Link>
              </Box>
              <Spacer />
              <Box>
                {user ? (
                  // If user is authenticated, show Logout button
                  <Logout />
                ) : (
                  // If user is not authenticated, show Sign Up and Log In links
                  <>
                    <Link href="/signup">
                      <Button colorScheme="teal" mr={4}>
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button colorScheme="teal">
                        Log In
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </Flex>
          </Box>
          <Box>{children}</Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
