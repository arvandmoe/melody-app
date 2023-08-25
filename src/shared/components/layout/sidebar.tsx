"use client";

import { PlaylistDialog } from "@/src/modules/playlist/components/playlist-dialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import PlaylistService from "../../services/playlist-service";
import { cn } from "../../utils";
import { ScrollArea } from "./scroll-area";
import Link from "next/link";
import { PlaylistSkeleton } from "@/src/modules/playlist/components/playlist-skeleton";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => PlaylistService.getAllPlaylists(),
  });
  const playlists = data?.data?.result?.items;

  return (
    <div className={cn("pb-12 h-full", className)}>
      <div className="relative w-full flex items-center text-lg font-medium">
        <Link href={"/"} className="absolute inset-0" />
        <div className="flex items-center ml-4 mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Melody App
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div>
          <div className="flex w-full items-center justify-between">
            <h2 className="relative px-4 text-lg font-semibold tracking-tight">
              Playlists
            </h2>
            <PlaylistDialog />
          </div>
          <ScrollArea className="h-full">
            {isLoading && <PlaylistSkeleton />}
            {playlists && !isLoading && (
              <div className="space-y-2 p-2">
                {playlists?.map((playlist, i) => (
                  <div
                    key={playlist?.id}
                    className="flex relative items-center w-full justify-start font-normal space-x-2"
                  >
                    <Link
                      href={`/playlist/${playlist?.id}`}
                      className="absolute inset-0"
                    ></Link>
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
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
