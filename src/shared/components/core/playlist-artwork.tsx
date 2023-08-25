"use client";

import Image from "next/image";

import Link from "next/link";
import { Playlist } from "../../types/Playlist";
import { cn } from "../../utils";

interface PlaylistArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  playlist: Playlist;
  width?: number;
  height?: number;
}

export function PlaylistArtwork({
  playlist,
  width,
  height,
  className,
  ...props
}: PlaylistArtworkProps) {
  return (
    <div key={playlist.id} className="relative">
      <div className="relative flex flex-col space-y-2">
        <Image
          src={playlist?.cover}
          alt={playlist?.title}
          width={width}
          height={height}
          className={cn(
            "object-cover transition-all hover:scale-105 aspect-square"
          )}
        />
      </div>
      <div className="flex flex-col mt-2">
        <Link
          href={`/playlist/${playlist.id}`}
          className="absolute inset-0"
        ></Link>
        <span className="text-lg">{playlist?.title}</span>
        <span className="text-gray-500">{`${playlist?.songs?.length} songs`}</span>
      </div>
    </div>
  );
}
