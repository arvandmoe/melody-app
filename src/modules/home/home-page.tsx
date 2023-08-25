import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/src/shared/components/core/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/shared/components/core/tabs";

import SongLayout from "@/src/modules/song/components/song-layout";
import { Sidebar } from "@/src/shared/components/layout/sidebar";
import LogoutButton from "./components/log-out-button";
import PlaylistLayout from "../playlist/playlist-layout";

export const metadata: Metadata = {
  title: "Melody App - Home",
  description: "Listen to music on Melody App",
};

export default function HomePage() {
  return (
    <>
      <div className="hidden md:block h-full">
        <div className="border-t h-full">
          <div className="bg-background h-full">
            <div className="grid lg:grid-cols-5 h-full">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          Musics
                        </TabsTrigger>
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
                      <SongLayout />
                    </TabsContent>
                    <TabsContent
                      value="playlists"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                     <PlaylistLayout />
                      <Separator className="my-4" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
