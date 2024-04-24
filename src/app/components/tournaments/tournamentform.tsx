import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  tournamentName: string;
  date: string;
  gender: string;
  level: string;
  size: string;
  menWinner: string;
  menRunnerUp: string;
  menSemiFinalist1: string;
  menSemiFinalist2: string;
  menSemiFinalist3: string;
  menQuarterFinalist1: string;
  menQuarterFinalist2: string;
  menQuarterFinalist3: string;
  menQuarterFinalist4: string;
  womenWinner: string;
  womenRunnerUp: string;
  womenSemiFinalist1: string;
  womenSemiFinalist2: string;
  womenSemiFinalist3: string;
  womenQuarterFinalist1: string;
  womenQuarterFinalist2: string;
  womenQuarterFinalist3: string;
  womenQuarterFinalist4: string;
};

export default function TournamentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div className="grid grid-cols-9 px-2 grid-rows-auto gap-2">
      <div className="text-2xl col-span-9 justify-self-center">
        Add Tournament
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-9 w-full justify-self-center"
      >
        {/*Title and First 3 Modules of the Form */}

        <div className="grid grid-cols-9 space-x-2">
          <div className="flex flex-col col-span-2">
            <label className="text-sm">Tournament</label>
            <input
              placeholder="Tournament Name"
              {...register("tournamentName", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm">Date</label>
            <input
              placeholder="DD/MM/YYYY"
              {...register("date", { required: true })}
              className="border-2 border-slate-200 rounded-md col-span-2"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm">Gender</label>
            <select
              defaultValue="men&women"
              {...register("gender", { required: true })}
              className="text-xl bg-white border-2 border-slate-200 rounded-md col-span-2"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="men&women">Men & Women</option>
            </select>
          </div>

          <div className="flex flex-col col-span-2">
            <label className="text-sm">Level</label>
            <select
              defaultValue="psa"
              {...register("level", { required: true })}
              className="text-xl bg-white border-2 border-slate-200 rounded-md col-span-2"
            >
              <option value="psa">PSA</option>
              <option value="satellite">Satellite</option>
              <option value="open">Open</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Size</label>
            <select
              defaultValue="8"
              {...register("size", { required: true })}
              className="text-xl bg-white border-2 border-slate-200 rounded-md col-span-1"
            >
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
        {/* -------------------------------------------------- Dynamic Form Options ---------------------------------- */}
        <div className="flex w-full">
          {/*---------------------------------Male Form Options------------------------------------*/}
          <div className="flex-col justify-center items-center w-1/2 m-2">
            <div className="text-2xl w-full text-center">Men</div>
            {/*---------------------------------Finalists---------------------------------------- */}
            <input
              placeholder="Winner"
              {...register("menWinner", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Runner Up"
              {...register("menRunnerUp", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Semi-Finalist"
              {...register("menSemiFinalist1", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Semi-Finalist"
              {...register("menSemiFinalist2", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Semi-Finalist"
              {...register("menSemiFinalist3", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("menQuarterFinalist1", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("menQuarterFinalist2", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("menQuarterFinalist3", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("menQuarterFinalist4", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
          </div>
          {/* ---------------------------------Female Form Options------------------------------- */}
          <div className="flex-col justify-center items-center w-1/2 m-2">
            <div className="text-2xl w-full text-center">Women</div>
            {/*----------------------------------Women Other Options------------------------------ */}
            <input
              placeholder="Winner"
              {...register("womenWinner", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Runner Up"
              {...register("womenRunnerUp", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Semi-Finalist"
              {...register("womenSemiFinalist1", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Semi-Finalist"
              {...register("womenSemiFinalist2", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Semi-Finalist"
              {...register("womenSemiFinalist3", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("womenQuarterFinalist1", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("womenQuarterFinalist2", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("womenQuarterFinalist3", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
            <input
              placeholder="Quarter Finalist"
              {...register("womenQuarterFinalist4", { required: true })}
              className="w-full border-2 border-slate-200 rounded-md mt-2"
            />
          </div>
        </div>
        <input
          type="submit"
          value="Save"
          className="w-1/4 h-12 m-2 rounded-md bg-yellow-400 hover:border-2 hover:border-black"
        />
      </form>
    </div>
  );
}
