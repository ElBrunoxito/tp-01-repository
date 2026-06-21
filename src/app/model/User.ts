export interface ResponseUserDTO {
  id: string;
  token: string;
  name: string;
  username: string;
  email: string;
  work: string;
  idChild: string;
  nameChild: string;
  ageChild: number;
  genderChild: string;
  levelTEA: number;
  currentProgress: number | 0
}

export interface LoginDTO{
  username:string
  password:string
}

export interface UpdateUserDTO {
  name: string;
  username: string;
  work: string;
  password: string;
  currentPassword?: string; 
  nameChild: string;
  ageChild: number;
  genderChild: string;
}

export interface CodeDTO{
  username: string
  code?: string
}