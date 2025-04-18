export interface IAuthContext {
  // user: IUser | null;
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

export interface IUser {
  email: string;
  fullname: string;
}
