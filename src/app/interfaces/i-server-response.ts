import { IUser } from '../user/interfaces/i-user';

// import { ISport } from "../sport/interfaces/i-sport";
// import { ITournament } from "../tournament/interfaces/i-tournament";

export interface IServerResponse {
    ok: boolean;
    token?: string;
    error?: string;
    user?: IUser;
    userId?: number;
}

// export interface ISportResponse extends IServerResponse {
//     sport?: ISport;
//     sports?: ISport[];
// }

// export interface ITournamentResponse extends IServerResponse {
//     tournament?: ITournament;
//     tournaments?: ITournament[];
// }
