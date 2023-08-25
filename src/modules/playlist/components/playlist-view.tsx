"use client";

import { Button } from "@/src/shared/components/core/button";
import { Icons } from "@/src/shared/components/core/icons";
import { PlaylistArtwork } from "@/src/shared/components/core/playlist-artwork";
import PlaylistService from "@/src/shared/services/playlist-service";
import { useQuery } from "@tanstack/react-query";

const PlaylistView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => PlaylistService.getAllPlaylists(),
  });
  const playlists = data?.data?.result?.items;
  return (
    <div>
      {!playlists && !isLoading && <PlaylistEmptyPlaceholder />}
      <div className="flex space-x-4 pb-4">
        {playlists &&
          playlists.map((playlist) => (
            <PlaylistArtwork
              key={playlist.title}
              playlist={playlist}
              width={250}
              height={250}
            />
          ))}
      </div>
    </div>
  );
};

export default PlaylistView;

export function PlaylistEmptyPlaceholder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Icons.playlist className="w-16 h-15" />

        <h3 className="mt-4 text-lg font-semibold">No episodes added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any playlists. Add one below.
        </p>
        <Button size="sm" className="relative">
          Add Playlist
        </Button>
      </div>
    </div>
  );
}
