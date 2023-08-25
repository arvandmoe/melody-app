"use client";

import { Button } from "@/src/shared/components/core/button";
import { Icons } from "@/src/shared/components/core/icons";
import PlaylistService from "@/src/shared/services/playlist-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SongView from "../song/components/song-view";
import { Trash2Icon } from "lucide-react";
import { useToast } from "@/src/shared/components/core/use-toast";
import { useRouter } from "next/navigation";

interface PlaylistPageProps extends React.HTMLAttributes<HTMLDivElement> {
  params: { id: number };
}

const PlaylistPage = (props: PlaylistPageProps) => {
  const { id } = props.params;
  const { toast } = useToast();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["playlists", id],
    queryFn: () => PlaylistService.getPlaylist(id),
  });
  const songs = data?.data?.result?.songs;
  const playlist = data?.data?.result;

  const { mutate, isLoading: removeLoading } = useMutation({
    mutationFn: () => PlaylistService.deletePlaylist(id),
    onSuccess() {
      toast({
        description: `Playlist deleted!`,
      });
      router.push("/");
    },
    onError() {
      toast({
        description: `Error`,
      });
    },
  });

  async function onRemoveClick() {
    mutate();
  }

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
      <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
        <div className="h-full px-4 py-6 lg:px-8">
          {playlist && (
            <div key={playlist?.id} className="flex items-start">
              <div className="flex items-center w-full justify-start font-normal space-x-2">
                <Image
                  alt={playlist?.title}
                  width={200}
                  height={200}
                  src={playlist?.cover}
                  className="rounded-sm"
                />
                <div className="flex flex-col">
                  <span className="text-[2rem]"> {playlist?.title}</span>
                  <span className="text-lg text-gray-400">
                    {`${playlist?.songs.length} songs`}
                  </span>
                </div>
              </div>
              <Button
                disabled={removeLoading}
                type="button"
                onClick={onRemoveClick}
                className="flex items-center bg-red-500 w-32"
              >
                {removeLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex items-center space-x-2 text-white">
                    <Trash2Icon />
                    <span>Remove</span>
                  </div>
                )}
              </Button>
            </div>
          )}
          <div className="mt-8">
            {isLoading || (songs && songs?.length > 0) ? (
              <SongView songs={songs} isLoading={isLoading} />
            ) : (
              <PlaylistEmptyPlaceholder />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;

export function PlaylistEmptyPlaceholder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Icons.playlist className="w-16 h-15" />

        <h3 className="mt-4 text-lg font-semibold">No songs added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any songs. Add one below.
        </p>
        <Button size="sm" className="relative">
          <Link href={"/"}>Add Song</Link>
        </Button>
      </div>
    </div>
  );
}
