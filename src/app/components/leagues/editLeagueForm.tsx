import { SubmitHandler, useForm } from "react-hook-form";
import { PlayerData, LeagueData } from "@/app/types/database";
import { updateLeague } from "@/app/hooks/updateData";

interface FormComponentProps {
  DefaultValues: LeagueData;
  PlayerData: PlayerData[];
}

const selectorStyles = "border-2 border-slate-200 rounded-md pl-2";

export default function EditLeagueForm({
  DefaultValues,
  PlayerData,
}: FormComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeagueData>();

  const onSubmit: SubmitHandler<LeagueData> = async (data) => {
    updateLeague(data);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-2xl">Edit League</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full p-2 space-x-2"
      >
        <div className="flex justify-center items-center space-x-2 w-full">
          <div className="flex flex-col w-2/3">
            <input
              placeholder="League Name"
              defaultValue={DefaultValues.name}
              {...register("name", { required: true })}
              className="border-2 border-slate-200 rounded-md w-full"
            />
            {errors.name?.type === "required" && (
              <p className="flex text-red-400">League Name is required</p>
            )}
          </div>
          <div className="flex flex-col w-1/4">
            <input
              placeholder="DD/MM/YYYY"
              defaultValue={DefaultValues.date}
              {...register("date", { required: true })}
              className="border-2 border-slate-200 rounded-md w-full"
            />
            {errors.date?.type === "required" && (
              <p className="flex text-red-400">Date is required</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-9 gap-2 pl-7 mt-2">
          <div className="flex flex-col">
            <label className="text-xs">Division</label>
            <select
              defaultValue={DefaultValues.division}
              {...register("division", { required: true })}
              className={selectorStyles}
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
              defaultValue={DefaultValues.position}
              {...register("position", { required: true })}
              className={selectorStyles}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-xs">Player1</label>
            <select
              defaultValue={DefaultValues.player1}
              {...register("player1", { required: true })}
              className={selectorStyles}
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
              defaultValue={DefaultValues.games1}
              {...register("games1", { required: true })}
              className={selectorStyles}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-xs">Player2</label>
            <select
              defaultValue={DefaultValues.player2}
              {...register("player2", { required: true })}
              className={selectorStyles}
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
              defaultValue={DefaultValues.games2}
              {...register("games2", { required: true })}
              className={selectorStyles}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
        <div className="pl-5">
          <input
            type="submit"
            value="Update League"
            className="w-1/6 h-8 m-2 rounded-md bg-yellow-400 hover:border-2 hover:border-black hover:bg-yellow-200"
          />
        </div>
      </form>
    </div>
  );
}
