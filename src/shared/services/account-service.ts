import client from "@/src/shared/network/axios-client";
import { LoginDto, LoginResult, RegisterDto, RegisterResult } from "@/src/shared/types/Account";
import { Response } from "@/src/shared/types/Response";

const register = (dto: RegisterDto) => {
  return client.post<Response<RegisterResult>>(`site/register`, dto);
};

const login = (dto: LoginDto) => {
  return client.post<Response<LoginResult>>(`site/login`, dto);
};

const AccountService = {
  register,
  login
};

export default AccountService;
