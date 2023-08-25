"use client";

import { Button } from "@/src/shared/components/core/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/core/dialog";
import PlaylistService from "@/src/shared/services/playlist-service";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { PlaylistSkeleton } from "./playlist-skeleton";

interface SelectPlaylistDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSelectPlaylist: (playlistId: number) => void;
}

export function SelectPlaylistDialog(props: SelectPlaylistDialogProps) {
  const { onSelectPlaylist, open, setOpen } = props;
  const { data, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => PlaylistService.getAllPlaylists(),
  });
  const playlists = data?.data?.result?.items;

  const openDialog = () => {
    setOpen(true);
  };

  const onPlaylistClick = (id: number) => {
    setOpen(false);
    onSelectPlaylist(id);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to playlist</DialogTitle>
          <DialogDescription>Choose playlist to add song to</DialogDescription>
        </DialogHeader>
        {isLoading && <PlaylistSkeleton />}
        {playlists && !isLoading && (
          <div className="space-y-2 p-2">
            {playlists?.map((playlist, i) => (
              <button
                key={playlist?.id}
                onClick={() => onPlaylistClick(playlist?.id)}
                className="flex relative items-center w-full justify-start font-normal space-x-2"
              >
                <Image
                  alt={playlist?.title}
                  width={64}
                  height={64}
                  src={playlist?.cover}
                  className="rounded-sm"
                />
                <div className="flex flex-col">
                  <span> {playlist?.title}</span>
                  <span className="text-xs text-gray-400">
                    {" "}
                    {`${playlist?.songs.length} songs`}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
