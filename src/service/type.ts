export interface IDataType<T = any> {
  code: number;
  message: string;
  responseTime: string;
  data?: T;
  params?: T;
}
