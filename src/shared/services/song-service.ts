import client from "@/src/shared/network/axios-client";
import { SongParams, SongResult } from "@/src/shared/types/Song";
import { Response } from "../types/Response";

const getAllSongs = (params?: SongParams) => {
  let url = `song`
  if(params?.filter !== '') url += `?filter[title][like]=${params?.filter}`

  return client.get<Response<SongResult>>(url, {
    params: {
      ...(params?.perPage !== undefined ? { "per-page": params?.perPage } : {}),
      ...(params?.page !== undefined ? { page: params?.page } : {}),
    },
  });
};

const SongService = {
  getAllSongs,
};

export default SongService;
