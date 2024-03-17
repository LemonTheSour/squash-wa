"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: String;
  password: String;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex justify-center align-center h-screen">
      <div className="flex justify-center align-center border-2 border-yellow-500 rounded-md w-1/2 h-1/2 p-10 mt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-3/4"
        >
          <input
            placeholder="username"
            {...register("username", { required: true })}
            className="color-grey text-xl w-3/4 border-2 border-black p-2 rounded-md"
          />
          {errors.username && (
            <span role="alrt" className="w-3/4 text-red-500 text-start">
              This field is required
            </span>
          )}
          <input
            placeholder="password"
            {...register("password", { required: true })}
            className="color-grey text-xl w-3/4 border-2 border-black mt-4 p-2 rounded-md"
          />
          {errors.password && (
            <span className="w-3/4 text-red-500 text-start">
              This field is required
            </span>
          )}
          <input
            type="submit"
            className="bg-yellow-400 w-1/2 rounded-md mt-4"
          />
        </form>
      </div>
    </div>
  );
}
