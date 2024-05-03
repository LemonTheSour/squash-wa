import { useForm, SubmitHandler } from "react-hook-form";
import { TournamentData } from "@/app/types/database";
import { useState } from "react";
import { db } from "../../../../firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";

async function addData({
  tournamentName,
  date,
  gender,
  menSize,
  womenSize,
  menLevel,
  womenLevel,
  menWinner,
  menRunnerUp,
  menSemiFinalist1,
  menSemiFinalist2,
  menQuarterFinalist1,
  menQuarterFinalist2,
  menQuarterFinalist3,
  menQuarterFinalist4,
  menPlateWinner,
  womenWinner,
  womenRunnerUp,
  womenSemiFinalist1,
  womenSemiFinalist2,
  womenQuarterFinalist1,
  womenQuarterFinalist2,
  womenQuarterFinalist3,
  womenQuarterFinalist4,
  womenPlateWinner,
}: TournamentData) {
  if (menPlateWinner == undefined || womenPlateWinner == undefined) {
    menPlateWinner = "Male Plate Winner";
    womenPlateWinner = "Women Plate Winner";
  }

  if (menQuarterFinalist1 == undefined) {
    menQuarterFinalist1 = "Male Quarter Finalist";
    menQuarterFinalist2 = "Male Quarter Finalist";
    menQuarterFinalist3 = "Male Quarter Finalist";
    menQuarterFinalist4 = "Male Quarter Finalist";
    womenQuarterFinalist1 = "Female Quarter Finalist";
    womenQuarterFinalist2 = "Female Quarter Finalist";
    womenQuarterFinalist3 = "Female Quarter Finalist";
    womenQuarterFinalist4 = "Female Quarter Finalist";
  }

  try {
    await updateDoc(doc(db, "tournaments", tournamentName), {
      tournamentName: tournamentName,
      date: date,
      gender: gender,
      menSize: menSize,
      womenSize: womenSize,
      menLevel: menLevel,
      womenLevel: womenLevel,
      menWinner: menWinner,
      menRunnerUp: menRunnerUp,
      menSemiFinalist1: menSemiFinalist1,
      menSemiFinalist2: menSemiFinalist2,
      menQuarterFinalist1: menQuarterFinalist1,
      menQuarterFinalist2: menQuarterFinalist2,
      menQuarterFinalist3: menQuarterFinalist3,
      menQuarterFinalist4: menQuarterFinalist4,
      menPlateWinner: menPlateWinner,
      womenWinner: womenWinner,
      womenRunnerUp: womenRunnerUp,
      womenSemiFinalist1: womenSemiFinalist1,
      womenSemiFinalist2: womenSemiFinalist2,
      womenQuarterFinalist1: womenQuarterFinalist1,
      womenQuarterFinalist2: womenQuarterFinalist2,
      womenQuarterFinalist3: womenQuarterFinalist3,
      womenQuarterFinalist4: womenQuarterFinalist4,
      womenPlateWinner: womenPlateWinner,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}

interface EditTournamentFormProps {
  data: TournamentData;
}
export default function EditTournamentForm({ data }: EditTournamentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentData>();

  const onSubmit: SubmitHandler<TournamentData> = (data) => {
    console.log(data);
    addData(data);
  };
  const [gender, setGender] = useState("men&women");
  const [menSize, setMenSize] = useState("16");
  const [womenSize, setWomenSize] = useState("16");

  return (
    <div className="grid grid-cols-9 px-2 grid-rows-auto gap-2">
      <div className="text-2xl col-span-9 justify-self-center">
        Edit Tournament
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-9 w-full justify-self-center"
      >
        {/*Title and First 3 Modules of the Form */}

        <div className="grid grid-cols-9 space-x-2">
          <div className="flex flex-col col-span-4">
            <label className="text-sm">Tournament</label>
            <input
              placeholder="Tournament Name"
              defaultValue={data.tournamentName}
              {...register("tournamentName", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm">Date</label>
            <input
              placeholder="DD/MM/YYYY"
              defaultValue={data.date}
              {...register("date", { required: true })}
              className="border-2 border-slate-200 rounded-md col-span-2"
            />
          </div>
          <div className="flex flex-col col-span-3">
            <label className="text-sm">Gender</label>
            <select
              defaultValue={data.gender}
              {...register("gender", { required: true })}
              className="text-xl bg-white border-2 border-slate-200 rounded-md"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="men&women">Men & Women</option>
            </select>
          </div>
        </div>
        {/* -------------------------------------------------- Dynamic Form Options ---------------------------------- */}
        <div className="flex w-full">
          {/*---------------------------------Male Form Options------------------------------------*/}
          {gender != "women" && (
            <div className="flex-col justify-center items-center w-1/2 m-2">
              <div className="text-2xl w-full text-center">Men</div>
              <div className="flex">
                <div className="flex flex-col w-1/2 pr-2">
                  <label className="text-sm">Level</label>
                  <select
                    defaultValue={data.menLevel}
                    {...register("menLevel", { required: true })}
                    className="text-xl bg-white border-2 border-slate-200 rounded-md col-span-1"
                  >
                    <option value="psa">PSA</option>
                    <option value="satellite">Satellite</option>
                    <option value="open">Open</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm">Size</label>
                  <select
                    defaultValue={data.menSize}
                    {...register("menSize", { required: true })}
                    className="text-xl bg-white border-2 border-slate-200 rounded-md col-span-1"
                    onChange={(e) => setMenSize(e.target.value)}
                  >
                    <option value="8">8</option>
                    <option value="16">16</option>
                  </select>
                </div>
              </div>
              {/*---------------------------------Finalists---------------------------------------- */}
              <input
                placeholder="Winner"
                defaultValue={data.menWinner}
                {...register("menWinner", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              <input
                placeholder="Runner Up"
                defaultValue={data.menRunnerUp}
                {...register("menRunnerUp", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              <input
                placeholder="Semi-Finalist"
                defaultValue={data.menSemiFinalist1}
                {...register("menSemiFinalist1", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              <input
                placeholder="Semi-Finalist"
                defaultValue={data.menSemiFinalist2}
                {...register("menSemiFinalist2", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              {/*-------------------------------- Dynamic Portion ---------------------------------- */}
              <div>
                {menSize == "8" ? (
                  <div>
                    <input
                      placeholder="Plate Winner"
                      defaultValue={data.menPlateWinner}
                      {...register("menPlateWinner", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.menQuarterFinalist1}
                      {...register("menQuarterFinalist1", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.menQuarterFinalist2}
                      {...register("menQuarterFinalist2", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.menQuarterFinalist3}
                      {...register("menQuarterFinalist3", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.menQuarterFinalist4}
                      {...register("menQuarterFinalist4", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---------------------------------Female Form Options------------------------------- */}
          {gender != "men" && (
            <div className="flex-col justify-center items-center w-1/2 m-2">
              <div className="text-2xl w-full text-center">Women</div>
              <div className="flex">
                <div className="flex flex-col w-1/2 pr-2">
                  <label className="text-sm">Level</label>
                  <select
                    defaultValue={data.womenLevel}
                    {...register("womenLevel", { required: true })}
                    className="text-xl bg-white border-2 border-slate-200 rounded-md col-span-1"
                  >
                    <option value="psa">PSA</option>
                    <option value="satellite">Satellite</option>
                    <option value="open">Open</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm">Size</label>
                  <select
                    defaultValue={data.womenSize}
                    {...register("womenSize", { required: true })}
                    className="text-xl bg-white border-2 border-slate-200 rounded-md col-span-1"
                    onChange={(e) => setWomenSize(e.target.value)}
                  >
                    <option value="8">8</option>
                    <option value="16">16</option>
                  </select>
                </div>
              </div>
              {/*----------------------------------Women Other Options------------------------------ */}
              <input
                placeholder="Winner"
                defaultValue={data.womenWinner}
                {...register("womenWinner", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              <input
                placeholder="Runner Up"
                defaultValue={data.womenRunnerUp}
                {...register("womenRunnerUp", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              <input
                placeholder="Semi-Finalist"
                defaultValue={data.womenSemiFinalist1}
                {...register("womenSemiFinalist1", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              <input
                placeholder="Semi-Finalist"
                defaultValue={data.womenSemiFinalist2}
                {...register("womenSemiFinalist2", { required: true })}
                className="w-full border-2 border-slate-200 rounded-md mt-2"
              />
              <div>
                {womenSize == "8" ? (
                  <div>
                    <input
                      placeholder="Plate Winner"
                      defaultValue={data.womenPlateWinner}
                      {...register("womenPlateWinner", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.womenQuarterFinalist1}
                      {...register("womenQuarterFinalist1", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.womenQuarterFinalist2}
                      {...register("womenQuarterFinalist2", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.womenQuarterFinalist3}
                      {...register("womenQuarterFinalist3", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                    <input
                      placeholder="Quarter Finalist"
                      defaultValue={data.womenQuarterFinalist4}
                      {...register("womenQuarterFinalist4", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <input
          type="submit"
          value="Edit"
          className="w-1/4 h-12 m-2 rounded-md bg-yellow-400 hover:border-2 hover:border-black"
        />
      </form>
    </div>
  );
}
