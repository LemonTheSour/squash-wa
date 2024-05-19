import { SubmitHandler, useFormContext } from "react-hook-form";
import { PlayerData, LeagueData } from "@/app/types/database";
import { updateLeague } from "@/app/hooks/updateData";
import MatchesForm from "./matchesForm";

interface FormComponentProps {
  DefaultValues: LeagueData;
  PlayerData: PlayerData[];
}

export default function EditLeagueForm({
  DefaultValues,
  PlayerData,
}: FormComponentProps) {
  const { register, handleSubmit, formState } = useFormContext<LeagueData>();
  const errors = formState.errors;

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

        {/* ----------------------------------------- Dynamic Form Component ----------------------------------*/}
        <div className="grid grid-cols-1 gap-2 pl-7 mt-2">
          <label className="justify-self-center">Matches</label>
          <MatchesForm PlayerData={PlayerData} />
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
