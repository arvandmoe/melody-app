"use client";

import { Separator } from "@/src/shared/components/core/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/shared/components/core/tabs";
import { Metadata } from "next";

import SongView from "@/src/modules/song/components/song-view";
import SongService from "@/src/shared/services/song-service";
import { useQuery } from "@tanstack/react-query";
import PlaylistView from "../playlist/components/playlist-view";
import LogoutButton from "./components/log-out-button";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/src/shared/components/core/input";

export const metadata: Metadata = {
  title: "Melody App - Home",
  description: "Listen to music on Melody App",
};

export default function HomePage() {
  const [filter, setFilter] = useState<string>("");
  const debouncedFilter = useDebounce(filter, 500);
  const { data, isLoading } = useQuery({
    queryKey: ["songs", debouncedFilter],
    queryFn: () =>
      SongService.getAllSongs({
        filter: debouncedFilter,
      }),
  });
  const songs = data?.data?.result?.items;

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="music" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="music">Musics</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            <div className="ml-auto">
              <LogoutButton />
            </div>
          </div>
          <TabsContent
            value="music"
            className="border-none p-0 outline-none h-full"
          >
            <Input
              name="search"
              type="text"
              placeholder="Search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <SongView songs={songs} isLoading={isLoading} />
          </TabsContent>
          <TabsContent
            value="playlists"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <PlaylistView />
            <Separator className="my-4" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
