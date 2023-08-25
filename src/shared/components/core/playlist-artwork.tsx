import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";

import { Playlist } from "../../types/Playlist";
import { cn } from "../../utils";
import Link from "next/link";

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
    <Link href={`/playlist/${playlist.id}`}>
      <div className="flex flex-col space-y-2">
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
        <span className="text-lg">{playlist?.title}</span>
        <span className="text-gray-500">{`${playlist?.songs?.length} songs`}</span>
      </div>
    </Link>
  );
}
