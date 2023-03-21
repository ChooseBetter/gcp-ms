import type {UploadUserFile} from "element-plus";
export interface formItemType {
  field: string;
  label: string;
  labelWidth?: string | number;
  width?: string | number;
  type: string;
  extraType?: string;
  placeholder?: string;
  props?: object;
  default?: any;
  options?: any;
  otherOptions?: any;
  fileList?: UploadUserFile;
  rows?: number;
  hidden?: {
    hiddenKey: string;
    hiddenValue: number;
  };
  append?: string;
}
export type formProps = {
  isInline: boolean;
  formItems: Array<formItemType>;
};
export interface modalConfigType extends formProps {
  modalTitle: string;
  modalWidth?: string | number;
  rules?: object;
}

export interface tableListType {
  prop?: string;
  label: string;
  minWidth: string;
  slotName: string;
  hasCustom?: boolean;
}
// content
export interface contentConfigType {
  title: string;
  ButtonTitle?: string;
  tableList: Array<tableListType>;
  showIndexColumn: boolean;
  showSelectColumn: boolean;
  showFooter: boolean;
  tableTree?: tableTreeType;
  tableStyle?: tableStyleType;
  paginationStyle?: paginationStyleType;
}
export interface tableTreeType {
  id: any;
  treeProps: object;
}
export interface tableStyleType {
  maxHeight: number;
  hasStripe: boolean;
}
export interface pageInfoType {
  currentPage: number;
  pageSize: number;
}
export interface paginationStyleType {
  small?: boolean;
  disabled?: boolean;
  background?: boolean;
}
export interface IDataType {
  name: string;
  value: any;
}
