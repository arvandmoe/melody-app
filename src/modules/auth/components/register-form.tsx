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
import { RegisterDto, RegisterError } from "@/src/shared/types/Account";
import { cn } from "@/src/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type RegisterFormValues = z.infer<typeof registFormSchema>;

const registFormSchema = z.object({
  first_name: z.string({
    required_error: "FirstName is required.",
  }),
  last_name: z.string({
    required_error: "LastName is required.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "At least 6 characters" }),
});

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: (dto: RegisterDto) => AccountService.register(dto),
    onSuccess(data, variables, context) {
      // Note: I'm using login on success due to lack of access token in register response
      toast({
        title: `Now login using your credentials`,
        description: `use username and password to login`,
      });
      router.push("/auth/login");
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

  const form = useForm<z.infer<typeof registFormSchema>>({
    resolver: zodResolver(registFormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    mutate(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Signup"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
