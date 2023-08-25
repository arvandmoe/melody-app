"use client";

import { PlaylistDialog } from "@/src/modules/playlist/components/playlist-dialog";
import { useQuery } from "@tanstack/react-query";
import PlaylistService from "../../services/playlist-service";
import { cn } from "../../utils";
import { Button } from "../core/button";
import { Icons } from "../core/icons";
import { ScrollArea } from "./scroll-area";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => PlaylistService.getAllPlaylists(),
  });
  const playlists = data?.data?.result?.items;

  return (
    <div className={cn("pb-12 h-full", className)}>
      <div className="space-y-4 py-4 px-2">
        <div className="py-2">
          <div className="flex w-full items-center justify-between">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              Playlists
            </h2>
            <PlaylistDialog />
          </div>
          <ScrollArea className="h-full px-1">
            {isLoading && <PlaylistSkeleton />}
            {playlists && !isLoading && (
              <div className="space-y-2 p-2">
                {playlists?.map((playlist, i) => (
                  <Link
                    href={`/playlist/${playlist?.id}`}
                    key={`${playlist}-${i}`}
                    className="flex items-center w-full justify-start font-normal space-x-2"
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
                  </Link>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

const PlaylistSkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      className="flex items-center w-full justify-start font-normal space-x-2 py-2 animate-pulse"
    >
      <div className="h-16 w-16 bg-gray-200 rounded-sm"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-4 bg-gray-200 w-40 rounded-md"></div>
        <div className="h-3 bg-gray-200 w-28 rounded-md"></div>
      </div>
    </div>
  ));

  return <div className="space-y-2 p-2">{skeletonItems}</div>;
};
