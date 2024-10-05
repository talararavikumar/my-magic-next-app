// app/auth/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailLink,
  isSignInWithEmailLink,
  getAdditionalUserInfo,
} from "firebase/auth";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { auth } from "@/app/lib/firebase";
import { useSearchParams } from "../../../../node_modules/next/navigation";

export default function Verify() {
  const searchParams = useSearchParams(); // Get search parameters

  const [message, setMessage] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const router = useRouter();
  // const { email } = router.query; // Extract the email from the URL query

  useEffect(() => {
    const email = searchParams.get("email");
    alert(email);

    if (email) {
      const verifyEmailLink = async () => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          try {
            const result = await signInWithEmailLink(
              auth,
              email,
              window.location.href
            );
            const additionalUserInfo = getAdditionalUserInfo(result);
            console.log(additionalUserInfo);

            router.push("/dashboard");

            // You can access the new user by importing getAdditionalUserInfo
            // and calling it with result:
            // getAdditionalUserInfo(result)
            // You can access the user's profile via:
            // getAdditionalUserInfo(result)?.profile
            // You can check if the user is new or existing:
            // getAdditionalUserInfo(result)?.isNewUser
          } catch (error) {
            setMessage(`Error: ${error.message}`);
          }
        }else alert('some thing wrong')
      } ;

      verifyEmailLink();
    }
  }, [searchParams]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {message}
      Loading
    </Box>
  );
}
