"use client";

import * as React from "react";

import { cn } from "@/src/shared/utils";
import { Button } from "@/src/shared/components/core/button";
import { Icons } from "@/src/shared/components/core/icons";
import { Input } from "@/src/shared/components/core/input";
import { Label } from "@/src/shared/components/core/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
          <Label className="sr-only" htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
}
