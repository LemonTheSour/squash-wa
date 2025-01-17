import { SubmitHandler, useForm } from "react-hook-form";
import { PlayerData } from "@/app/types/database";
import { addPlayer } from "@/app/hooks/addData";
import { getPlayerIds } from "@/app/hooks/getData";
import { useState } from "react";
import ErrorModal from "../errorModal";

interface PlayerFormProps {
  PlayerData: PlayerData[];
  onClose: () => void;
}

export default function AddPlayerForm({
  PlayerData,
  onClose,
}: PlayerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerData>();

  const [openModal, setOpenModal] = useState(false);

  const onSubmit: SubmitHandler<PlayerData> = async (data) => {
    const PlayerIds = getPlayerIds();
    if ((await PlayerIds).includes(data.squashId)) {
      console.log("Cannot use Duplicate Id");
      setOpenModal(true);
      return false;
    }
    await addPlayer(data);
    onClose();
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
          {...register("region", { required: true })}
          className="bg-white border-2 border-slate-200 rounded-md col-span-1"
        >
          <option value="Metro">Metro</option>
          <option value="Country">Country</option>
        </select>
        <input
          value={0}
          type="hidden"
          {...register("rating", { required: true })}
        />
        <input
          type="submit"
          value="Add Player"
          className="h-8 rounded-md bg-yellow-400 hover:border-2 hover:border-black col-span-2"
        />
      </form>

      <ErrorModal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <p>Squash Identification is already in use.</p>
      </ErrorModal>
    </div>
  );
}
