"use client";

import { Button } from "@/src/shared/components/core/button";
import { Icons } from "@/src/shared/components/core/icons";
import { useToast } from "@/src/shared/components/core/use-toast";
import PlaylistService from "@/src/shared/services/playlist-service";
import { AddToPlaylistDto } from "@/src/shared/types/Playlist";
import { Song } from "@/src/shared/types/Song";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import clsx from "clsx";
import { useState } from "react";
import { SelectPlaylistDialog } from "../../playlist/components/select-playlist-dialog";
import { SongSkeleton } from "./song-skeleton";

interface SongViewProps {
  songs: Song[] | undefined;
  isLoading: boolean;
}

export default function SongView(props: SongViewProps) {
  const { songs, isLoading } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const { mutate, isLoading: addLoading } = useMutation({
    mutationFn: (dto: AddToPlaylistDto) =>
      PlaylistService.addSongToPlaylist(dto),
    onSuccess() {
      queryClient.refetchQueries(["playlists"]);
      toast({
        description: `Song added to playlist!`,
      });
    },
    onError() {
      toast({
        description: `Error`,
      });
    },
  });

  async function onAddClick(songId: number) {
    setSelectedSongId(songId);
    setOpen(true);
  }

  async function onSelectPlaylist(playlistId: number) {
    if (selectedSongId && playlistId) {
      mutate({
        songId: selectedSongId,
        playlistId: playlistId,
      });
    }
  }

  return (
    <>
      {isLoading && <SongSkeleton />}
      {songs && !isLoading && (
        <ul role="list" className="w-full h-full divide-y divide-gray-100">
          {songs?.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {song.title}
                  </p>
                  <p
                    className={clsx(
                      "text-green-700 bg-green-50 ring-green-600/20",
                      "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {song.format}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  {song.year != "0" ? (
                    <>
                      <p className="whitespace-nowrap">
                        <time dateTime={song.year}>{song.year}</time>
                      </p>
                      <svg
                        viewBox="0 0 2 2"
                        className="h-0.5 w-0.5 fill-current"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                    </>
                  ) : null}
                  <p className="truncate">Created by {song.artist_name}</p>
                </div>
              </div>
              <div className="flex">
                <Button variant="ghost" onClick={() => onAddClick(song?.id)}>
                  <Icons.playlist className="mr-2 h-4 w-4" />
                </Button>
                <div className="flex flex-none items-center gap-x-4">
                  <a
                    href={`${song.file}.${song.format}`}
                    target="_blank"
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                  >
                    Download<span className="sr-only">, {song.title}</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <SelectPlaylistDialog
        open={open}
        setOpen={setOpen}
        onSelectPlaylist={onSelectPlaylist}
      />
    </>
  );
}
