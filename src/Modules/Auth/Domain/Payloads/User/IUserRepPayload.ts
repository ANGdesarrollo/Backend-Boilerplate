export interface IUserRepPayload {
    username: string;
    password: string;
    // token?: string;
    // resetPasswordToken?: string;
    // permissions: string[];
    role: string;
    verify: boolean;
    enable: boolean;
}
