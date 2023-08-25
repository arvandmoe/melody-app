"use client";

import SongService from "@/src/shared/services/song-service";
import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";

export default function SongLayout() {
  const { data, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: () => SongService.getAllSongs(),
  });
  const songs = data?.data?.result.items;

  return (
    <>
      {isLoading && (
        <SkeletonLoadingComponent />
      )}

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
              <div className="flex flex-none items-center gap-x-4">
                <a
                  href={`${song.file}.${song.format}`}
                  target="_blank"
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  Download<span className="sr-only">, {song.title}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const SkeletonLoadingComponent = () => {
  const skeletonItems = Array.from({ length: 10 }, (_, index) => (
    <li
      key={index}
      className="flex items-center justify-between gap-x-6 py-5 animate-pulse"
    >
      <div className="min-w-0 w-full">
        <div className="flex items-start gap-x-3">
          <div className="h-5 bg-gray-200 w-3/4 rounded-sm"></div>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-300">
          <div className="h-4 bg-gray-200 w-1/4 rounded-sm"></div>
          <div className="h-4 bg-gray-200 w-1/8 rounded-sm"></div>
          <div className="h-4 bg-gray-200 w-1/4 rounded-sm"></div>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <div className="h-8 w-24 bg-gray-200 rounded-sm"></div>
      </div>
    </li>
  ));

  return (
    <ul role="list" className="w-full h-full divide-y divide-gray-100">
      {skeletonItems}
    </ul>
  );
};

