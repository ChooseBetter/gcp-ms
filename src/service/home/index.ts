import hyRequest from "@/service";
import {IDataType} from "../type";

export function reqCardList(url: string) {
  return hyRequest.get<IDataType>(url);
}
export function reqChartList(url: string) {
  return hyRequest.get<IDataType>(url);
}
