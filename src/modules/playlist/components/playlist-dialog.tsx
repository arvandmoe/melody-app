"use client";

import { Button } from "@/src/shared/components/core/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/shared/components/core/dialog";
import { PlusIcon } from "lucide-react";
import { PlaylistForm } from "./playlist-form";
import { useState } from "react";


export function PlaylistDialog() {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New playlist</DialogTitle>
          <DialogDescription>Create a new playlist</DialogDescription>
        </DialogHeader>
        <PlaylistForm closeDialog={closeDialog}/>
      </DialogContent>
    </Dialog>
  );
}
