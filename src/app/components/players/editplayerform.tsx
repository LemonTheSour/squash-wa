import { PlayerData } from "@/app/types/database";
import { SubmitHandler, useForm } from "react-hook-form";
import { updatePlayer } from "@/app/hooks/updateData";
import getPlayerIds from "@/app/hooks/getPlayerIds";

interface EditPlayerProps {
  data: PlayerData;
}

export default function EditPlayerForm({ data }: EditPlayerProps) {
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
    updatePlayer(data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-3xl">Edit Player</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 p-4 w-3/4"
      >
        <div className="col-span-2">
          <input
            placeholder="Squash Id"
            defaultValue={data.squashId}
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
            defaultValue={data.firstName}
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
            defaultValue={data.lastName}
            {...register("lastName", { required: true })}
            className="border-2 border-slate-200 rounded-md w-full"
          />
          {errors.lastName?.type === "required" && (
            <p className="flex text-red-400">Last Name is required</p>
          )}
        </div>
        <select
          defaultValue={data.gender}
          {...register("gender", { required: true })}
          className="bg-white border-2 border-slate-200 rounded-md col-span-1"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unspecified">Unspecified</option>
        </select>
        <select
          defaultValue={data.region}
          {...register("region", { required: true })}
          className="bg-white border-2 border-slate-200 rounded-md col-span-1"
        >
          <option value="Metro">Metro</option>
          <option value="Country">Country</option>
        </select>
        <input
          placeholder="Rating"
          defaultValue={data.rating}
          {...register("rating", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-2"
        />
        <input
          type="submit"
          value="Edit Player"
          className="h-8 rounded-md bg-yellow-400 hover:border-2 hover:border-black col-span-2"
        />
      </form>
    </div>
  );
}
