import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../../firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";

type FormInputs = {
  name: string;
  date: string;
  division: string;
  position: string;
  player1: string;
  player2: string;
  games1: string;
  games2: string;
};

async function addData({
  name,
  date,
  division,
  position,
  player1,
  player2,
  games1,
  games2,
}: FormInputs) {
  try {
    const docRef = await setDoc(doc(db, "leagues", name), {
      date: date,
      division: division,
      position: position,
      player1: player1,
      player2: player2,
      player1Games: games1,
      player2Games: games2,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}
export default function LeagueForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    addData(data);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-2xl">Add League</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full p-2 space-x-2"
      >
        <div className="flex justify-center items-center space-x-2 w-full">
          <input
            placeholder="League Name"
            {...register("name", { required: true })}
            className="border-2 border-slate-200 rounded-md w-2/3"
          />
          <input
            placeholder="DD/MM/YYYY"
            {...register("date", { required: true })}
            className="border-2 border-slate-200 rounded-md w-1/4"
          />
        </div>
        <div className="grid grid-cols-9 gap-2 pl-7 mt-2">
          <div className="flex flex-col">
            <label className="text-xs">Division</label>
            <input
              placeholder="0"
              {...register("division", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs">Position</label>
            <input
              placeholder="Pos"
              {...register("position", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-xs">Player1</label>
            <input
              placeholder="Player1"
              {...register("player1", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs">Games</label>
            <input
              placeholder="Games"
              {...register("games1", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-xs">Player2</label>
            <input
              placeholder="Player2"
              {...register("player2", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs">Games</label>
            <input
              placeholder="Games"
              {...register("games2", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
        </div>
        <div className="pl-5">
          <input
            type="submit"
            value="Create League"
            className="w-1/6 h-8 m-2 rounded-md bg-yellow-400 hover:border-2 hover:border-black"
          />
        </div>
      </form>
    </div>
  );
}
