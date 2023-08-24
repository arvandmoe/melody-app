import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/src/shared/components/core/button";
import { Separator } from "@/src/shared/components/core/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/shared/components/core/tabs";

import SongLayout from "@/src/modules/home/components/song-layout";
import { PodcastEmptyPlaceholder } from "@/src/shared/components/core/podcast-empty-placeholder";
import { playlists } from "@/src/shared/components/data/playlists";
import { Sidebar } from "@/src/shared/components/layout/sidebar";
import { useQuery } from "@tanstack/react-query";
import SongService from "@/src/shared/services/song-service";

export const metadata: Metadata = {
  title: "Melody App - Home",
  description: "Listen to music on Melody App",
};

export default function HomePage() {
  // const { data } = useQuery({queryKey: ['songs'], queryFn: SongService.getAllSongs})


  return (
    <main>
      <>
        <div className="md:hidden">
          <Image
            src="/examples/music-light.png"
            width={1280}
            height={1114}
            alt="Music"
            className="block dark:hidden"
          />
          <Image
            src="/examples/music-dark.png"
            width={1280}
            height={1114}
            alt="Music"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden md:block h-full">
          <div className="border-t h-full">
            <div className="bg-background h-full">
              <div className="grid lg:grid-cols-5 h-full">
                <Sidebar playlists={playlists} className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <Tabs defaultValue="music" className="h-full space-y-6">
                      <div className="space-between flex items-center">
                        <TabsList>
                          <TabsTrigger value="music" className="relative">
                            Music
                          </TabsTrigger>
                          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                          <TabsTrigger value="live" disabled>
                            Live
                          </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto mr-4">
                          <Button>
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            Add music
                          </Button>
                        </div>
                      </div>
                      <TabsContent
                        value="music"
                        className="border-none p-0 outline-none h-full"
                      >
                        <SongLayout />
                      </TabsContent>
                      <TabsContent
                        value="podcasts"
                        className="h-full flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              New Episodes
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Your favorite podcasts. Updated daily.
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <PodcastEmptyPlaceholder />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </main>
  );
}
