import hyRequest from "@/service";
import {IDataType} from "../type";

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.get<IDataType>(url, queryInfo);
}
export function createPageData(url: string, newData: any, config?: any) {
  return hyRequest.post<IDataType>(url, {...newData}, config);
}

export function editPageData(url: string, editData: any, config?: any) {
  return hyRequest.post<IDataType>(url, {...editData}, config);
}

export function deletePageData(url: string, ids: any) {
  return hyRequest.post<IDataType>(url, {ids});
}
