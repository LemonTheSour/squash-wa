import { useForm, SubmitHandler } from "react-hook-form";
import { PlayerData, TournamentData } from "@/app/types/database";
import { useEffect } from "react";
import { UpdateTournaments } from "@/app/hooks/updateData";

interface EditTournamentFormProps {
  data: TournamentData;
  maleData: PlayerData[];
  femaleData: PlayerData[];
  onClose: () => void;
}

const inputStyles = "w-full border-2 border-slate-200 rounded-md bg-white";

export default function EditTournamentForm({
  data,
  maleData,
  femaleData,
  onClose,
}: EditTournamentFormProps) {
  const {
    register,
    unregister,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentData>({
    defaultValues: {
      ...data,
    },
  });

  const onSubmit: SubmitHandler<TournamentData> = async (data) => {
    await UpdateTournaments(data);
    onClose();
  };

  const watchMenSize = watch("menSize");
  const watchWomenSize = watch("womenSize");
  const watchGender = watch("gender");

  useEffect(() => {
    if (watchGender === "men") {
      unregister([
        "womenWinner",
        "womenRunnerUp",
        "womenSemiFinalist1",
        "womenSemiFinalist2",
        "womenQuarterFinalist1",
        "womenQuarterFinalist2",
        "womenQuarterFinalist3",
        "womenQuarterFinalist4",
        "womenPlateWinner",
        "womenSize",
        "womenLevel",
      ]);
    }
    if (watchGender === "women") {
      unregister([
        "menWinner",
        "menRunnerUp",
        "menSemiFinalist1",
        "menSemiFinalist2",
        "menQuarterFinalist1",
        "menQuarterFinalist2",
        "menQuarterFinalist3",
        "menQuarterFinalist4",
        "menPlateWinner",
        "menSize",
        "menLevel",
      ]);
    }
    if (watchMenSize === "16") {
      unregister("menPlateWinner");
    }
    if (watchWomenSize === "16") {
      unregister("womenPlateWinner");
    }
    if (watchMenSize === "8") {
      unregister([
        "menQuarterFinalist1",
        "menQuarterFinalist2",
        "menQuarterFinalist3",
        "menQuarterFinalist4",
      ]);
    }
    if (watchWomenSize === "8") {
      unregister([
        "womenQuarterFinalist1",
        "womenQuarterFinalist2",
        "womenQuarterFinalist3",
        "womenQuarterFinalist4",
      ]);
    }
  }, [unregister, watchMenSize, watchWomenSize, watchGender]);
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
            {errors.tournamentName?.type === "required" && (
              <p className="flex text-red-400">Tournament Name is required</p>
            )}
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm">Date</label>
            <input
              placeholder="DD/MM/YYYY"
              defaultValue={data.date}
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
              defaultValue={data.gender}
              {...register("gender", { required: true })}
              className="text-xl bg-white border-2 border-slate-200 rounded-md"
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
          {watchGender != "women" && (
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
                  defaultValue={data.menWinner}
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
                  defaultValue={data.menRunnerUp}
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
                  defaultValue={data.menSemiFinalist1}
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
                  defaultValue={data.menSemiFinalist2}
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
                {watchMenSize == "8" ? (
                  <div>
                    <label className="text-sm font-medium">Plate Winner</label>
                    <select
                      defaultValue={data.menPlateWinner}
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
                        defaultValue={data.menQuarterFinalist1}
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
                        defaultValue={data.menQuarterFinalist2}
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
                        defaultValue={data.menQuarterFinalist3}
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
                        defaultValue={data.menQuarterFinalist4}
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
          {watchGender != "men" && (
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
                  defaultValue={data.womenWinner}
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
                  defaultValue={data.womenRunnerUp}
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
                  defaultValue={data.womenSemiFinalist1}
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
                  defaultValue={data.womenSemiFinalist2}
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
                {watchWomenSize == "8" ? (
                  <div>
                    <label className="text-sm font-medium">Plate Winner</label>
                    <select
                      defaultValue={data.womenPlateWinner}
                      {...register("womenPlateWinner")}
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
                        defaultValue={data.womenQuarterFinalist1}
                        {...register("womenQuarterFinalist1")}
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
                        defaultValue={data.womenQuarterFinalist2}
                        {...register("womenQuarterFinalist2")}
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
                        defaultValue={data.womenQuarterFinalist3}
                        {...register("womenQuarterFinalist3")}
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
                        defaultValue={data.womenQuarterFinalist4}
                        {...register("womenQuarterFinalist4")}
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
          value="Update Tournament"
          className="w-1/4 h-12 m-2 rounded-md bg-yellow-400 hover:border-2 hover:border-black"
        />
      </form>
    </div>
  );
}
