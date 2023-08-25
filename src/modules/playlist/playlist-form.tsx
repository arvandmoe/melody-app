"use client";

import * as React from "react";

import { Button } from "@/src/shared/components/core/button";
import { DialogFooter } from "@/src/shared/components/core/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/components/core/form";
import { Input } from "@/src/shared/components/core/input";
import { useToast } from "@/src/shared/components/core/use-toast";
import PlaylistService from "@/src/shared/services/playlist-service";
import { RegisterError } from "@/src/shared/types/Account";
import { cn } from "@/src/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Icons } from "@/src/shared/components/core/icons";

interface PlaylistFormProps extends React.HTMLAttributes<HTMLDivElement> {
  closeDialog: () => void;
}

type PlaylistFormValues = z.infer<typeof playlistFormSchema>;

const playlistFormSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  cover: z.any({
    required_error: "Cover is required",
  }),
});

export function PlaylistForm({ className, ...props }: PlaylistFormProps) {
  const { closeDialog } = props;
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient()

  const [cover, setCover] = React.useState<File | null>(null);

  const form = useForm<PlaylistFormValues>({
    resolver: zodResolver(playlistFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: FormData) => PlaylistService.addPlaylist(formData),
    onSuccess(data, variables, context) {
      queryClient.refetchQueries(['playlists'])
      toast({
        title: `New playlist!`,
        description: "Playlist added!",
      });
      closeDialog();
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setCover(selectedFile);
    }
  };

  async function onSubmit(data: PlaylistFormValues) {
    if (cover && data?.title) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("cover", cover);
      console.log(formData);
      mutate(formData);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Cover</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Cover"
                    disabled={isLoading}
                    {...field}
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
