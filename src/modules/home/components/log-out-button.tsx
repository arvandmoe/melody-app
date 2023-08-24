"use client";

import { Button } from "@/src/shared/components/core/button";
import { ExitIcon } from "@radix-ui/react-icons";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const onLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };
  return (
    <Button onClick={() => onLogout()}>
      <ExitIcon className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
