import { useForm, SubmitHandler } from "react-hook-form";
import { PlayerData, TournamentData } from "@/app/types/database";
import { useState } from "react";
import { addTournament } from "@/app/hooks/addData";

const inputStyles = "w-full border-2 border-slate-200 rounded-md bg-white";

interface AddTournamentFormProps {
  maleData: PlayerData[];
  femaleData: PlayerData[];
}

export default function TournamentForm({
  maleData,
  femaleData,
}: AddTournamentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentData>();

  const onSubmit: SubmitHandler<TournamentData> = (data) => {
    console.log(data);
    addTournament(data);
  };

  const [gender, setGender] = useState("men&women");
  const [menSize, setMenSize] = useState("16");
  const [womenSize, setWomenSize] = useState("16");

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
          <div className="flex flex-col col-span-4">
            <label className="text-sm">Tournament</label>
            <input
              placeholder="Tournament Name"
              {...register("tournamentName", { required: true })}
              className="border-2 border-slate-200 rounded-md"
            />
            {errors.tournamentName?.type === "required" && (
              <p className="flex text-red-400">Tournament Name is required</p>
            )}
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm">Date</label>
            <input
              placeholder="DD/MM/YYYY"
              {...register("date", { required: true })}
              className="border-2 border-slate-200 rounded-md col-span-2"
            />
            {errors.date?.type === "required" && (
              <p className="flex text-red-400">Date is required</p>
            )}
          </div>
          <div className="flex flex-col col-span-3">
            <label className="text-sm">Gender</label>
            <select
              defaultValue="men&women"
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
                    defaultValue="psa"
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
                    defaultValue="16"
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
              <div>
                <label className="text-sm font-medium">Winner</label>
                <select
                  {...register("menWinner", { required: true })}
                  className={inputStyles}
                >
                  {maleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Runner Up</label>
                <select
                  {...register("menRunnerUp", { required: true })}
                  className={inputStyles}
                >
                  {maleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Semi-Finalist 1</label>
                <select
                  {...register("menSemiFinalist1", { required: true })}
                  className={inputStyles}
                >
                  {maleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Semi-Finalist 2</label>
                <select
                  {...register("menSemiFinalist2", { required: true })}
                  className={inputStyles}
                >
                  {maleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              {/*-------------------------------- Dynamic Portion ---------------------------------- */}
              <div>
                {menSize == "8" ? (
                  <div>
                    <label className="text-sm font-medium">Plate Winner</label>
                    <select
                      {...register("menPlateWinner", { required: true })}
                      className={inputStyles}
                    >
                      {maleData.map((player, index) => (
                        <option key={index} value={player.squashId}>
                          {player.firstName} {player.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 1
                      </label>
                      <select
                        {...register("menQuarterFinalist1", { required: true })}
                        className={inputStyles}
                      >
                        {maleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 2
                      </label>
                      <select
                        {...register("menQuarterFinalist2", { required: true })}
                        className={inputStyles}
                      >
                        {maleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 3
                      </label>
                      <select
                        {...register("menQuarterFinalist3", { required: true })}
                        className={inputStyles}
                      >
                        {maleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 4
                      </label>
                      <select
                        {...register("menQuarterFinalist4", { required: true })}
                        className={inputStyles}
                      >
                        {maleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
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
              <div>
                <label className="text-sm font-medium">Winner</label>
                <select
                  {...register("womenWinner", { required: true })}
                  className={inputStyles}
                >
                  {femaleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Runner Up</label>
                <select
                  {...register("womenRunnerUp", { required: true })}
                  className={inputStyles}
                >
                  {femaleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Semi-Finalist 1</label>
                <select
                  {...register("womenSemiFinalist1", { required: true })}
                  className={inputStyles}
                >
                  {femaleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Semi-Finalist 2</label>
                <select
                  {...register("womenSemiFinalist2", { required: true })}
                  className={inputStyles}
                >
                  {femaleData.map((player, index) => (
                    <option key={index} value={player.squashId}>
                      {player.firstName} {player.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {womenSize == "8" ? (
                  <div>
                    <label className="text-sm font-medium">Plate Winner</label>
                    <select
                      {...register("womenPlateWinner", { required: true })}
                      className={inputStyles}
                    >
                      {femaleData.map((player, index) => (
                        <option key={index} value={player.squashId}>
                          {player.firstName} {player.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 1
                      </label>
                      <select
                        {...register("womenQuarterFinalist1", {
                          required: true,
                        })}
                        className={inputStyles}
                      >
                        {femaleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 2
                      </label>
                      <select
                        {...register("womenQuarterFinalist2", {
                          required: true,
                        })}
                        className={inputStyles}
                      >
                        {femaleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 3
                      </label>
                      <select
                        {...register("womenQuarterFinalist3", {
                          required: true,
                        })}
                        className={inputStyles}
                      >
                        {femaleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Quarter Finalist 4
                      </label>
                      <select
                        {...register("womenQuarterFinalist4", {
                          required: true,
                        })}
                        className={inputStyles}
                      >
                        {femaleData.map((player, index) => (
                          <option key={index} value={player.squashId}>
                            {player.firstName} {player.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <input
          type="submit"
          value="Add Tournament"
          className="w-1/4 h-12 m-2 rounded-md bg-yellow-400 hover:border-2 hover:border-black"
        />
      </form>
    </div>
  );
}
