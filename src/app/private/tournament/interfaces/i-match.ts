export interface IMatch {
    id?: number;
    matchday_id?: number;
    tournament_id?: number;
    team_local_id: number;
    team_visitor_id: number;
    team_local_goals: number;
    team_visitor_goals: number;
    date?: string;
}
