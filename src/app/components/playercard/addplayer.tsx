import { SubmitHandler, useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";

type FormInputs = {
  firstName: string;
  lastName: string;
  gender: string;
  region: string;
};

type PlayerData = {
  firstName: string;
  lastName: string;
  rating: string;
  gender: string;
  region: string;
};

async function addData({ firstName, lastName, gender, region }: FormInputs) {
  try {
    const docRef = await setDoc(doc(db, "players", "player2"), {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      region: region,
      rating: "0",
    });
    console.log("Document writtenw ith ID: ");
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
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    addData(data);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full text-center text-2xl">Add Player</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 p-4 w-3/4"
      >
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
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unspecified">Unspecified</option>
        </select>
        <select
          defaultValue=""
          {...register("region", { required: true })}
          className="bg-white border-2 border-slate-200 rounded-md col-span-1"
        >
          <option value="metro">Metro</option>
          <option value="country">Country</option>
        </select>
        <input
          type="submit"
          value="Save"
          className="h-8 rounded-md bg-yellow-400 hover:border-2 hover:border-black col-span-2"
        />
      </form>
    </div>
  );
}
