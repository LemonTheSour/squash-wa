import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { PlayerData, LeagueData } from "@/app/types/database";

interface FormValues {
  PlayerData: PlayerData[];
}

const selectorStyles = "border-2 border-slate-200 rounded-md pl-2 bg-white";

export default function MatchesForm({ PlayerData }: FormValues) {
  const { control, register } = useFormContext<LeagueData>();

  const { fields, append, remove } = useFieldArray({
    name: "matches",
    control,
  });

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <div className="grid grid-cols-9 gap-2 pl-7 mt-2 w-full">
              <div className="flex flex-col">
                <label className="text-xs">Division</label>
                <select
                  className={selectorStyles}
                  {...register(`matches.${index}.division`, { required: true })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs">Position</label>
                <select
                  className={selectorStyles}
                  {...register(`matches.${index}.position`, { required: true })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-xs">Player1</label>
                <select
                  className={selectorStyles}
                  {...register(`matches.${index}.player1`, { required: true })}
                >
                  {PlayerData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col col-span-1">
                <label className="text-xs">Games</label>
                <select
                  className={selectorStyles}
                  {...register(`matches.${index}.games1`, { required: true })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div className="flex flex-col col-span-2">
                <label className="text-xs">Player2</label>
                <select
                  className={selectorStyles}
                  {...register(`matches.${index}.player2`, { required: true })}
                >
                  {PlayerData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col col-span-1">
                <label className="text-xs">Games</label>
                <select
                  className={selectorStyles}
                  {...register(`matches.${index}.games2`, { required: true })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              className="border-black border-1 rounded-md ml-7 mt-2 text-sm p-1 hover:border-red-400"
              onClick={() => remove(index)}
            >
              Remove Match
            </button>
          </div>
        );
      })}
      <button
        type="button"
        className="border-black border-1 rounded-md ml-7 mt-2 text-sm p-1 hover:border-green-400"
        onClick={() =>
          append({
            division: "",
            position: "",
            player1: "",
            player2: "",
            games1: "",
            games2: "",
          })
        }
      >
        Add Matches
      </button>
    </div>
  );
}
