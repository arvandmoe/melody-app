import client from "@/src/shared/network/axios-client";
import { SongParams, SongResult } from "@/src/shared/types/Song";
import { Response } from "../types/Response";

const getAllSongs = (params?: SongParams) => {
  return client.get<Response<SongResult>>(`song`, {
    params: {
      "filter[title][like]": params?.filter,
      "per-page": params?.perPage,
      page: params?.page,
    },
  });
};

const SongService = {
  getAllSongs,
};

export default SongService;
