"use client";

import { Separator } from "@/src/shared/components/core/separator";
import {
  ScrollArea,
  ScrollBar,
} from "@/src/shared/components/layout/scroll-area";

import { AlbumArtwork } from "@/src/shared/components/core/album-artwork";
import { listenNowAlbums } from "@/src/shared/components/data/albums";
import { useQuery } from "@tanstack/react-query";
import SongService from "@/src/shared/services/song-service";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const projects = [
  {
    id: 1,
    name: "GraphQL API",
    href: "#",
    status: "Complete",
    createdBy: "Leslie Alexander",
    dueDate: "March 17, 2023",
    dueDateTime: "2023-03-17T00:00Z",
  },
  {
    id: 2,
    name: "New benefits plan",
    href: "#",
    status: "In progress",
    createdBy: "Leslie Alexander",
    dueDate: "May 5, 2023",
    dueDateTime: "2023-05-05T00:00Z",
  },
  {
    id: 3,
    name: "Onboarding emails",
    href: "#",
    status: "In progress",
    createdBy: "Courtney Henry",
    dueDate: "May 25, 2023",
    dueDateTime: "2023-05-25T00:00Z",
  },
  {
    id: 4,
    name: "iOS app",
    href: "#",
    status: "In progress",
    createdBy: "Leonard Krasner",
    dueDate: "June 7, 2023",
    dueDateTime: "2023-06-07T00:00Z",
  },
  {
    id: 5,
    name: "Marketing site redesign",
    href: "#",
    status: "Archived",
    createdBy: "Courtney Henry",
    dueDate: "June 10, 2023",
    dueDateTime: "2023-06-10T00:00Z",
  },
];

export default function SongLayout() {
  const { data } = useQuery({
    queryKey: ["songs"],
    queryFn: () => SongService.getAllSongs(),
  });
  const songs = data?.data?.result.items;
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {songs &&
        songs?.map((song) => (
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
                {song.year != '0' ?<>
                  <p className="whitespace-nowrap">
                    <time dateTime={song.year}>{song.year}</time>
                  </p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg></>: null}
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
  );
}
