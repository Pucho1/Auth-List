export type User = {
    email: string;
    id: number;
    name: string;
    password?: string;
    surname:string;
  };
  export type ResponseUserLogin = {
    accessToken: string;
  };

  export type IFormInputUser = {
    name: string;
    email: string;
    password:string;
    surname:string;
  }