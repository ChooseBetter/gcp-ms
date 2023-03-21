export interface CommonType {
  isCollapse: boolean;
  entireMenu: any[];
  entireRole: any[];
  entireCategory: any[];
  entireTag: any[];
  entireSquare: any[];
  managersList: any[];
  managersCount: number;
  menusList: any[];
  rolesList: any[];
  rolesCount: number;
  categorysList: any[];
  categorysCount: number;
  usersList: any[];
  usersCount: number;
  tagsList: any[];
  tagsCount: number;
  articlesList: any[];
  articlesCount: number;
  themesList: any[];
  themesCount: number;
  squaresList: any[];
  squaresCount: number;
}

export interface managerStateType {
  token: string;
  managerInfo: managerInfoType;
  managerMenus: any[];
  managerAction: any[];
}

export interface managerInfoType {
  _id: string;
  avatar: string;
  managerName: string;
  cellphone: string;
  role: string;
  roleName: string;
  loginTime: string;
}

export interface formatRoleType {
  label: string;
  value: string;
}

export interface LoginDataType {
  managerName: string;
  managerPwd: string;
}
