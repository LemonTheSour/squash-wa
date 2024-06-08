import { PlayerData } from "../types/database";

export function separateGenders(playerData: PlayerData[], gender: String) {
  let MaleData: PlayerData[] = [];
  let FemaleData: PlayerData[] = [];

  {
    playerData.map((player) => {
      if (player.gender === "Male") {
        MaleData.push(player);
      } else {
        FemaleData.push(player);
      }
    });
  }

  if (gender === "Male") {
    return MaleData;
  }
  return FemaleData;
}
