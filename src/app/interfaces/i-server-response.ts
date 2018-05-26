import { IUser } from '../user/interfaces/i-user';
import { ITournament } from '../private/tournament/interfaces/i-tournament';

export interface IServerResponse {
    ok: boolean;
    token?: string;
    error?: string;
    user?: IUser;
    userId?: number;
    tournamentId?: number;
    calendarId?: number;
    matchId?: number;
    id?: string;
}

export interface ITournamentResponse extends IServerResponse {
    tournament?: ITournament;
    tournaments?: ITournament[];
}
