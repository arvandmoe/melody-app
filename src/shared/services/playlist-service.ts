import client from "@/src/shared/network/axios-client";
import { Playlist, PlaylistDto, PlaylistResult } from "../types/Playlist";
import { Response } from "../types/Response";

const getAllPlaylists = () => {
  return client.get<Response<PlaylistResult>>(`playlist`);
};

const addPlaylist = (id: number, dto: PlaylistDto) => {
  return client.post<Response<Playlist>>(`playlist/${id}`, dto);
};

const updatePlaylist = (id: number, dto: PlaylistDto) => {
  return client.patch<Response<Playlist>>(`playlist/${id}`, dto);
};

const deletePlaylist = (id: number) => {
  return client.delete<Response<Playlist>>(`playlist/${id}`);
};

const addSongToPlaylist = (
  songId: number,
  playlistId: number,
) => {
  return client.post<Response<PlaylistResult>>(`/playlist/add-song/${playlistId}`, {
    song_id: songId,
  });
};

const removeSongFromPlaylist = (
  songId: number,
  playlistId: number,
) => {
  return client.post<Response<PlaylistResult>>(`/playlist/add-song/${playlistId}`, {
    song_id: songId,
  });
};

const PlaylistService = {
  getAllPlaylists,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist
};

export default PlaylistService;
