import { SubmitHandler, useForm } from "react-hook-form";
import { PlayerData, LeagueData } from "@/app/types/database";
import { addLeague } from "@/app/hooks/addData";

interface FormComponentProps {
  PlayerData: PlayerData[];
}

const selectorStyles = "border-2 border-slate-200 rounded-md pl-2 bg-white";

export default function LeagueForm({ PlayerData }: FormComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeagueData>();

  const onSubmit: SubmitHandler<LeagueData> = async (data) => {
    addLeague(data);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-2xl">Add League</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full p-2 space-x-2"
      >
        <div className="flex justify-center items-center space-x-2 w-full">
          <div className="flex flex-col w-2/3">
            <input
              placeholder="League Name"
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
              {...register("division", { required: true })}
              className={selectorStyles}
              defaultValue=""
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
            value="Add League"
            className="w-1/6 h-8 m-2 rounded-md bg-yellow-400 hover:border-2 hover:border-black"
          />
        </div>
      </form>
    </div>
  );
}
