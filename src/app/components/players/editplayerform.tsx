import { PlayerData } from "@/app/types/database";
import { SubmitHandler, useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";

interface EditPlayerProps {
  data: PlayerData;
}

async function updateData({
  firstName,
  lastName,
  gender,
  region,
  rating,
  squashId,
}: PlayerData) {
  try {
    await updateDoc(doc(db, "players", squashId), {
      squashId: squashId,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      region: region,
      rating: rating,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}
export default function EditPlayerForm({ data }: EditPlayerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerData>();

  const onSubmit: SubmitHandler<PlayerData> = async (data) => {
    updateData(data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-3xl">Edit Player</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 p-4 w-3/4"
      >
        <input
          placeholder="Squash Id"
          defaultValue={data.squashId}
          readOnly={true}
          {...register("squashId", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-2 text-slate-400"
        />
        <input
          placeholder="First Name"
          defaultValue={data.firstName}
          {...register("firstName", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-1"
        />
        <input
          placeholder="Last Name"
          defaultValue={data.lastName}
          {...register("lastName", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-1"
        />
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
