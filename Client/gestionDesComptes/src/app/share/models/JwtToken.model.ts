export class JwtToken{
    isAuthenticated: boolean;
    token: string;
    username: string;
    roles:Array<string>;
    isAdmin: boolean;
}