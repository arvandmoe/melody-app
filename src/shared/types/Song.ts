export interface SongParams {
  filter?: string;
  perPage?: number;
  page?: number;
}

export interface SongResult {
  items: Song[];
}

export interface Song {
  id: number;
  album_name: string;
  artist_name: string;
  duration: string;
  title: string;
  year: string;
  file: string;
  format: string;
}
