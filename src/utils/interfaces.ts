export interface IFormInput {
  username: string;
  age: number;
  gender: NonNullable<'male' | 'female' | 'other'>;
  image: string;
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
  image: string;
}

export interface IData {
  profileList: IProfile[];
  image: '';
}

export interface IProfileProps {
  profile: IProfile;
  index: number;
}

export interface IErrors {
  username: boolean;
  age: boolean;
  gender: boolean;
  country: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  accept: boolean;
}
