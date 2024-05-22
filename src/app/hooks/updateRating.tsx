import { db } from "../../../firebase/clientApp";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { MatchData, TournamentData } from "../types/database";
import { LeagueMatches } from "../types/rating";
import getPlayers from "./getPlayers";

const PSA = 5;
const SATELLLITE = 10;
const OPEN = 7;
const LEAGUE = 4;
const WINNER = 10;
const RUNNERUP = 8;
const SEMIFINALIST = 6;
const QUARTERFINALIST = 4;
const PLATEWINNER = 1;

// Parse an array of matches and upload them to the database.
export async function updateRating(Matches: MatchData[]) {
  Matches.map(async (match) => {
    try {
      await updateDoc(doc(db, "matches", match.playerId), {
        match: arrayUnion(match.matches),
      });
      console.log("Match History Updated");
      return true;
    } catch {
      console.log("Match History Failed To Update");
      return false;
    }
  });
}

export async function calculateRating(Matches: MatchData[]) {
  Matches.map(async (match) => {
    // const playerRating = AllPlayers.find(item => item.squashId === match.playerId)
    const playerRef = doc(db, "players", match.playerId);
    let newRating = 0;
    match.matches.map((game) => {
      newRating += game.points;
    });

    await updateDoc(playerRef, {
      rating: newRating,
    });
  });
}

// Function which returns two MatchData objects [Winner, Loser]
export function collectLeagueMatches(
  matches: LeagueMatches,
  leagueTitle: string
) {
  if (matches.games1 > matches.games2) {
    return [
      {
        playerId: matches.player1,
        match: {
          points: LEAGUE,
          event: leagueTitle,
          placement: "Winner",
        },
      },
      {
        playerId: matches.player2,
        match: {
          points: 0,
          event: leagueTitle,
          placement: "Loser",
        },
      },
    ];
  } else {
    if (matches.games2 > matches.games1) {
      return [
        {
          playerId: matches.player2,
          match: {
            points: LEAGUE,
            event: matches.division,
            placement: "Winner",
          },
        },
        {
          playerId: matches.player1,
          match: {
            points: 0,
            event: matches.division,
            placement: "Loser",
          },
        },
      ];
    }
  }
}

// Function which returns an array of MatchData from a Tournament form
export function collectTournamentMatches(matches: TournamentData) {
  const score = [
    {
      playerId: matches.menWinner,
      match: {
        points: WINNER,
        event: matches.tournamentName,
        placement: "Winner",
      },
    },
    {
      playerId: matches.menRunnerUp,
      match: {
        points: RUNNERUP,
        event: matches.tournamentName,
        placement: "Runner Up",
      },
    },
    {
      playerId: matches.menSemiFinalist1,
      match: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.menSemiFinalist2,
      match: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist1,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist2,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist3,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist4,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menPlateWinner,
      match: {
        points: PLATEWINNER,
        event: matches.tournamentName,
        placement: "Plate Winner",
      },
    },
    {
      playerId: matches.womenWinner,
      match: {
        points: WINNER,
        event: matches.tournamentName,
        placement: "Winner",
      },
    },
    {
      playerId: matches.womenRunnerUp,
      match: {
        points: RUNNERUP,
        event: matches.tournamentName,
        placement: "Runner Up",
      },
    },
    {
      playerId: matches.womenSemiFinalist1,
      match: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.womenSemiFinalist2,
      match: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist1,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist2,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist3,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist4,
      match: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenPlateWinner,
      match: {
        points: PLATEWINNER,
        event: matches.tournamentName,
        placement: "Plate Winner",
      },
    },
  ];
  return score;
}
