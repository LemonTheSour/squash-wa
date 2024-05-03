"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { TournamentData } from "@/app/types/database";
import { useState } from "react";

export default function TournamentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentData>();

  const onSubmit: SubmitHandler<TournamentData> = (data) => console.log(data);

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
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm">Date</label>
            <input
              placeholder="DD/MM/YYYY"
              {...register("date", { required: true })}
              className="border-2 border-slate-200 rounded-md col-span-2"
            />
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
                    defaultValue="8"
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
              {/*-------------------------------- Dynamic Portion ---------------------------------- */}
              <div>
                {menSize == "8" ? (
                  <div>
                    <input
                      placeholder="Plate Winner"
                      {...register("menPlateWinner", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                  </div>
                ) : (
                  <div>
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
                    defaultValue="psa"
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
                    defaultValue="8"
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
              <div>
                {womenSize == "8" ? (
                  <div>
                    <input
                      placeholder="Plate Winner"
                      {...register("womenPlateWinner", { required: true })}
                      className="w-full border-2 border-slate-200 rounded-md mt-2"
                    />
                  </div>
                ) : (
                  <div>
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
                )}
              </div>
            </div>
          )}
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
