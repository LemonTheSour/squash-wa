import { db } from "../../../firebase/clientApp";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
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
      const newDocRef = doc(subCollectionRef, match.matches.matchId);
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

// Parse an array of matches and upload them to the database.
export async function alterMatches(Histories: Histories[]) {
  Histories.map(async (match) => {
    try {
      const docRef = doc(
        db,
        "matches",
        match.playerId,
        "matchHistory",
        match.matches.matchId
      );

      await setDoc(docRef, {
        points: match.matches.points,
        event: match.matches.event,
        placement: match.matches.placement,
      });
      console.log("Match History Altered");
      return true;
    } catch {
      console.log("Match History Failed To Alter");
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
    // Determine the winning player and the losing player
    const WINNER = match.games1 > match.games2 ? match.player1 : match.player2;
    const LOSER = match.games1 > match.games2 ? match.player2 : match.player1;

    matchList.push({
      playerId: WINNER,
      matches: {
        points: LEAGUE,
        placement: "Winner",
        event: LeagueData.name,
        matchId: match.matchId,
      },
    });
    matchList.push({
      playerId: LOSER,
      matches: {
        points: 0,
        placement: "Loser",
        event: LeagueData.name,
        matchId: match.matchId,
      },
    });
  });
  return matchList;
}

// Function which returns an array of MatchData from a Tournament form
export function collectTournamentMatches(matches: TournamentData) {
  const matchId = matches.tournamentName.replace(/\s/g, "");
  const scores: Histories[] = [
    {
      playerId: matches.menWinner,
      matches: {
        points: WINNER,
        event: matches.tournamentName,
        placement: "Winner",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menRunnerUp,
      matches: {
        points: RUNNERUP,
        event: matches.tournamentName,
        placement: "Runner Up",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menSemiFinalist1,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menSemiFinalist2,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menQuarterFinalist1,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menQuarterFinalist2,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menQuarterFinalist3,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menQuarterFinalist4,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.menPlateWinner,
      matches: {
        points: PLATEWINNER,
        event: matches.tournamentName,
        placement: "Plate Winner",
        matchId: matchId,
      },
    },
    {
      playerId: matches.womenWinner,
      matches: {
        points: WINNER,
        event: matches.tournamentName,
        placement: "Winner",
        matchId: matchId,
      },
    },
    {
      playerId: matches.womenRunnerUp,
      matches: {
        points: RUNNERUP,
        event: matches.tournamentName,
        placement: "Runner Up",
        matchId: matchId,
      },
    },
    {
      playerId: matches.womenSemiFinalist1,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.womenSemiFinalist2,
      matches: {
        points: SEMIFINALIST,
        event: matches.tournamentName,
        placement: "Semi-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.womenQuarterFinalist1,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: matchId,
      },
    },
    {
      playerId: matches.womenQuarterFinalist2,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: `${matches.tournamentName}`,
      },
    },
    {
      playerId: matches.womenQuarterFinalist3,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: `${matches.tournamentName}`,
      },
    },
    {
      playerId: matches.womenQuarterFinalist4,
      matches: {
        points: QUARTERFINALIST,
        event: matches.tournamentName,
        placement: "Quarter-Finalist",
        matchId: `${matches.tournamentName}`,
      },
    },
    {
      playerId: matches.womenPlateWinner,
      matches: {
        points: PLATEWINNER,
        event: matches.tournamentName,
        placement: "Plate Winner",
        matchId: `${matches.tournamentName}`,
      },
    },
  ];
  scores.forEach((score, index) => {
    if (!score.playerId) {
      scores.splice(index, 1);
    }
  });
  return scores;
}
