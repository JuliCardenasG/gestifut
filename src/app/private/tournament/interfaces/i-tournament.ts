export interface ITournament {
    id?: number;
    tournamentTypeId: number;
    sportId: number;
    adminId: number;
    name: string;
    teamsNumber: number;
    password?: string;
}