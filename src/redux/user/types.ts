export type UserModel = {
  username: string;
  staffId: string;
  company_position?: string;
  header_image?: string;
  token?: string;
  role?:string
};


export interface userStateModel {
  isLoggedIn: boolean;
  userId: string;
  authInfo: UserModel | null;
  token: string;
}