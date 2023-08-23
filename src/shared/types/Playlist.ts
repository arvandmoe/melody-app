import { Song } from "./Song";

export interface PlaylistDto {
  title: string;
  file: any;
}

export interface PlaylistResult {
  items: Playlist[];
}

export interface Playlist {
  id: number;
  title: string;
  cover: string;
  created_at: string;
  updated_at: string;
  songs: Song[];
}
