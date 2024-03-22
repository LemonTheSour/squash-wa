"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

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
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signIn("credentials", {
        redirect: true,
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

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
            value="Sign In"
            className="bg-yellow-400 w-3/4 h-12 rounded-md mt-4 hover:bg-yellow-300"
          />
        </form>
      </div>
    </div>
  );
}
