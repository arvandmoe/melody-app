"use client";

import * as React from "react";

import { Button } from "@/src/shared/components/core/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/components/core/form";
import { Icons } from "@/src/shared/components/core/icons";
import { Input } from "@/src/shared/components/core/input";
import { useToast } from "@/src/shared/components/core/use-toast";
import AccountService from "@/src/shared/services/account-service";
import { LoginDto, RegisterError } from "@/src/shared/types/Account";
import { cn } from "@/src/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type LoginFormValues = z.infer<typeof loginFormSchema>;

const loginFormSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters.",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "At least 6 characters" }),
});

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (dto: LoginDto) => AccountService.login(dto),
    onSuccess(data, variables, context) {
      Cookies.set("token", data?.data?.result.access_token);
      router.replace("/");
    },
    onError(error: AxiosError<RegisterError>, variables, context) {
      const errors = error?.response?.data.result;
      errors?.forEach((item) => {
        toast({
          title: `Please edit ${item.field} field`,
          description: item.message,
        });
      });
    },
  });

  async function onSubmit(data: LoginFormValues) {
    mutate(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
