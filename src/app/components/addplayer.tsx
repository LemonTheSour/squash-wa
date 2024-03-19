import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  firstName: string;
  lastName: string;
  gender: string;
  region: string;
};

export default function AddPlayerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);
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
          className="w-1/2 h-8 rounded-md bg-yellow-400 hover:border-2 hover:border-black"
        />
      </form>
    </div>
  );
}
