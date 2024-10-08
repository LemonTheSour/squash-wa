import { Timestamp } from "firebase/firestore";

export type PlayerData = {
  squashId: string;
  firstName: string;
  lastName: string;
  gender: string;
  region: string;
  rating: number;
}

export type LeagueData = {
  name: string;
  date: Date;
  matches:{
    matchId: string;
    division: string;
    position: string;
    player1: string;
    player2: string;
    games1: string;
    games2: string;
  }[]
}

export type TournamentData = {
  tournamentName: string;
  matchId: string;
  date: string;
  gender: string;
  menSize: string;
  womenSize: string;
  menLevel: string;
  womenLevel: string;
  menWinner: string;
  menRunnerUp: string;
  menSemiFinalist1: string;
  menSemiFinalist2: string;
  menQuarterFinalist1: string;
  menQuarterFinalist2: string;
  menQuarterFinalist3: string;
  menQuarterFinalist4: string;
  menPlateWinner: string;
  womenWinner: string;
  womenRunnerUp: string;
  womenSemiFinalist1: string;
  womenSemiFinalist2: string;
  womenQuarterFinalist1: string;
  womenQuarterFinalist2: string;
  womenQuarterFinalist3: string;
  womenQuarterFinalist4: string;
  womenPlateWinner: string;
}

export type MatchData = {
  playerId: string;
  matches:{
    points: number;
    event: string;
    placement: string;
  }[]
}

export type Histories = {
  playerId: string;
  matches:{
    points: number;
    event: string;
    placement: string;
    matchId: string;
  }
}

export type History = {
    points: number;
    event: string;
    placement: string
}

export type LeagueMatch = {
  matchId: string;
  division: string;
  position: string;
  player1: string;
  player2: string;
  games1: string;
  games2: string;
}