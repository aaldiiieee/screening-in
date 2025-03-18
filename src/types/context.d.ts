export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  signIn: (userData: IUser, token: string) => void;
  signOut: () => void;
}

export interface IUser {
  mu_id: number;
  mu_uuid: string;
  mu_phone_number: string;
  mu_email: string;
  mu_address: string;
  mu_province: string;
  mu_city: string;
  mu_district: string;
  mu_full_name: string;
  mu_image_url: string;
  mu_image_public_id: string;
}
