import { ITeam } from "../../team/interfaces/i-team";

export interface ITournament {
    id?: number;
    adminId: number;
    name: string;
    teamsNumber: number;
    image?: string;
    description: string;
    is_public?: boolean;
    teams?: ITeam[];
    matches?: any;
    matchdays?: any;
    goalscorers?: any;
}
