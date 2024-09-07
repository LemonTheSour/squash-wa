import { db } from "../../../firebase/clientApp";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  MatchData,
  TournamentData,
  LeagueData,
  Histories,
} from "../types/database";

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
export async function updateMatches(Histories: Histories[]) {
  Histories.map(async (match) => {
    try {
      const subCollectionRef = collection(
        db,
        "matches",
        match.playerId,
        "matchHistory"
      );
      const newDocRef = doc(subCollectionRef);
      await setDoc(newDocRef, {
        points: match.matches.points,
        event: match.matches.event,
        placement: match.matches.placement,
      });
      console.log("Match History Updated");
      return true;
    } catch {
      console.log("Match History Failed To Update");
      return false;
    }
  });
}

// A function which is given a players match history, and uses it to recalculate
// The players new ratings.
export async function calculateRating(Matches: MatchData[]) {
  // TODO Add function to remove match history based on time.
  Matches.map(async (match) => {
    const playerRef = doc(db, "players", match.playerId);
    console.log(playerRef);
    let newRating = 0;
    match.matches.map((game) => {
      newRating += game.points;
    });
    console.log(newRating);
    await updateDoc(playerRef, {
      rating: newRating,
    });
  });
}

// Function which returns an array of League match histories.
export function collectLeagueMatches(LeagueData: LeagueData) {
  const matches = LeagueData.matches;
  const matchList: Histories[] = [];
  matches.map((match) => {
    // If player1 wins the match, updated the matchlist to reflect
    // thier win and player2's loss
    if (match.games1 > match.games2) {
      matchList.push({
        playerId: match.player1,
        matches: {
          points: LEAGUE,
          placement: "Winner",
          event: LeagueData.name,
        },
      });
      matchList.push({
        playerId: match.player2,
        matches: {
          points: 0,
          placement: "Loser",
          event: LeagueData.name,
        },
      });
    }
    // If player2 wins the match, update the match to reflect
    // player2's win and player 1's loss
    else {
      matchList.push({
        playerId: match.player2,
        matches: {
          points: LEAGUE,
          placement: "Winner",
          event: LeagueData.name,
        },
      });
      matchList.push({
        playerId: match.player1,
        matches: {
          points: 0,
          placement: "Loser",
          event: LeagueData.name,
        },
      });
    }
  });
  return matchList;
}

// Function which returns an array of MatchData from a Tournament form
export function collectTournamentMatches(matches: TournamentData) {
  const score: Histories[] = [
    {
      playerId: matches.menWinner,
      matches: {
        points: WINNER,
        event: matches.tournamentName,
        placement: "Winner",
      },
    },
    {
      playerId: matches.menRunnerUp,
      matches: {
        points: RUNNERUP,
        event: matches.tournamentName,
        placement: "Runner Up",
      },
    },
    {
      playerId: matches.menSemiFinalist1,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.menSemiFinalist2,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist1,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist2,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist3,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menQuarterFinalist4,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.menPlateWinner,
      matches: {
        points: PLATEWINNER,
        event: matches.tournamentName,
        placement: "Plate Winner",
      },
    },
    {
      playerId: matches.womenWinner,
      matches: {
        points: WINNER,
        event: matches.tournamentName,
        placement: "Winner",
      },
    },
    {
      playerId: matches.womenRunnerUp,
      matches: {
        points: RUNNERUP,
        event: matches.tournamentName,
        placement: "Runner Up",
      },
    },
    {
      playerId: matches.womenSemiFinalist1,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.womenSemiFinalist2,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist1,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist2,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist3,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenQuarterFinalist4,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
      },
    },
    {
      playerId: matches.womenPlateWinner,
      matches: {
        points: PLATEWINNER,
        event: matches.tournamentName,
        placement: "Plate Winner",
      },
    },
  ];
  return score;
}
