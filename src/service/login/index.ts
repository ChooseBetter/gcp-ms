import hyRequest from "@/service";
import {IDataType} from "../type";
import {LoginDataType} from "@/store/type";

export function LoginRequest(loginData: LoginDataType) {
  return hyRequest.post<IDataType>("/managers/login", loginData);
}

export function getPermissionList() {
  return hyRequest.get<IDataType>("/managers/permissionList");
}
