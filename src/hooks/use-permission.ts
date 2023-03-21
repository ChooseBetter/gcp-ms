import {managerStore} from "@/store/manager";
const {managerAction} = managerStore();
export default function usePermission(pageName: string, action: string) {
  const str = pageName.slice(0, -1) + "-" + action;
  return !!managerAction.find((item: string) => item === str);
}
