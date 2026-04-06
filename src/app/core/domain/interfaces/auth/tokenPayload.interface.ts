
export interface TokenPayload {
  sub: string;
  username: string;
  name: string;
  roles: string[];       // ['ROLE_ADMIN'] | ['ROLE_USER'] | ['ROLE_PROFESOR']
  firstLogin: boolean;
  token_type: string;
  exp: number;
  iat: number;
  isGoogleUser: boolean;
}