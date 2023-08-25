import client from "@/src/shared/network/axios-client";
import { Playlist, PlaylistDto, PlaylistResult } from "../types/Playlist";
import { Response } from "../types/Response";

const getAllPlaylists = () => {
  return client.get<Response<PlaylistResult>>(`playlist`);
};

const getPlaylist = (id: number) => {
  return client.get<Response<Playlist>>(`playlist/${id}`);
};

const addPlaylist = (dto: FormData) => {
  return client.post<Response<Playlist>>(`playlist`, dto, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updatePlaylist = (id: number, dto: PlaylistDto) => {
  return client.patch<Response<Playlist>>(`playlist/${id}`, dto);
};

const deletePlaylist = (id: number) => {
  return client.delete<Response<Playlist>>(`playlist/${id}`);
};

const addSongToPlaylist = (songId: number, playlistId: number) => {
  return client.post<Response<PlaylistResult>>(
    `/playlist/add-song/${playlistId}`,
    {
      song_id: songId,
    }
  );
};

const removeSongFromPlaylist = (songId: number, playlistId: number) => {
  return client.post<Response<PlaylistResult>>(
    `/playlist/add-song/${playlistId}`,
    {
      song_id: songId,
    }
  );
};

const PlaylistService = {
  getAllPlaylists,
  getPlaylist,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};

export default PlaylistService;
