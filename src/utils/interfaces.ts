export interface IFormInput {
  username: string;
  age: number;
  gender: NonNullable<'male' | 'female' | 'other'>;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}

export interface IProfile {
  accept: boolean;
  age: string;
  confirmPassword: string;
  country: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  password: string;
  username: string;
}

export interface IData {
  profileList: IProfile[];
}

export interface IProfileProps {
  profile: IProfile;
  index: number;
}
