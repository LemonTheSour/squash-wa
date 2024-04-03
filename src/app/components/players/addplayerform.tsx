import { doc, setDoc } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../../../firebase/clientApp";

interface PlayerData {
  position: string;
  firstName: string;
  lastName: string;
  gender: string;
  rating: string;
  squashId: string;
  region: string;
}

async function addData({
  firstName,
  lastName,
  gender,
  region,
  rating,
  squashId,
}: PlayerData) {
  try {
    const docRef = await setDoc(doc(db, "players", squashId), {
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

export default function AddPlayerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerData>();

  const onSubmit: SubmitHandler<PlayerData> = async (data) => {
    addData(data);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full text-center text-2xl">Create New Players</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 p-4 w-3/4"
      >
        <input
          placeholder="Squash Id"
          {...register("squashId", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-2"
        />
        <input
          placeholder="First Name"
          {...register("firstName", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-1"
        />
        <input
          placeholder="Last Name"
          {...register("lastName", { required: true })}
          className="border-2 border-slate-200 rounded-md col-span-1"
        />
        <select
          defaultValue=""
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
          value="Create Player"
          className="h-8 rounded-md bg-yellow-400 hover:border-2 hover:border-black col-span-2"
        />
      </form>
    </div>
  );
}
