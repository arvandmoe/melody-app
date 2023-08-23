import client from "@/src/shared/network/axios-client";
import { SongParams } from "@/src/shared/types/Song";

const getAllSongs = (params: SongParams) => {
  return client.get(`song`, {
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
