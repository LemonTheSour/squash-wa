import { SubmitHandler, useForm } from "react-hook-form";
import getPlayerIds from "@/app/hooks/getPlayerIds";
import { PlayerData } from "@/app/types/database";
import { addPlayer } from "@/app/hooks/addData";

export default function AddPlayerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerData>();

  const onSubmit: SubmitHandler<PlayerData> = async (data) => {
    const PlayerIds = getPlayerIds();
    if ((await PlayerIds).includes(data.squashId)) {
      console.log("Cannot use Duplicate Id");
      return false;
    }
    addPlayer(data);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full text-center text-2xl">Create New Players</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 p-4 w-3/4"
      >
        <div className="col-span-2">
          <input
            placeholder="Squash Id"
            {...register("squashId", { required: true })}
            className="border-2 border-slate-200 rounded-md w-full"
          />
          {errors.squashId?.type === "required" && (
            <p className="flex text-red-400">Squad Id is required</p>
          )}
        </div>
        <div className="col-span-1">
          <input
            placeholder="First Name"
            {...register("firstName", { required: true })}
            className="border-2 border-slate-200 rounded-md w-full"
          />
          {errors.firstName?.type === "required" && (
            <p className="flex text-red-400">First name is required</p>
          )}
        </div>
        <div className="col-span-1">
          <input
            placeholder="Last Name"
            {...register("lastName", { required: true })}
            className="border-2 border-slate-200 rounded-md w-full"
          />
          {errors.lastName?.type === "required" && (
            <p className="flex text-red-400">Last Name is required</p>
          )}
        </div>
        <select
          {...register("gender", { required: true })}
          className="bg-white border-2 border-slate-200 rounded-md col-span-1"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unspecified">Unspecified</option>
        </select>
        <select
          defaultValue=""
          {...register("region", { required: true })}
          className="bg-white border-2 border-slate-200 rounded-md col-span-1"
        >
          <option value="Metro">Metro</option>
          <option value="Country">Country</option>
        </select>
        <input
          placeholder="Rating"
          {...register("rating", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-2"
        />
        <input
          type="submit"
          value="Add Player"
          className="h-8 rounded-md bg-yellow-400 hover:border-2 hover:border-black col-span-2"
        />
      </form>
    </div>
  );
}
