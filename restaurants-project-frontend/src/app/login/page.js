"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { postLogin } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryClient } from "../context/ReactQueryClientProvider";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { mutate } = useMutation({
    mutationKey: "login",
    mutationFn: postLogin,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      router.push("/map");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const onSubmit = async (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.error("Error during onSubmit function:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-row gap-10 p-10 items-end">
      <div className="flex-1 bg-[#264BEB] text-white rounded-lg p-4">
        <img
          src="/white-logo.svg"
          alt="Logo"
          className="w-[194px] h-[44px] mb-5"
        />
        <Link href="/signin" className="hover:font-bold">
          ¿No tienes una cuenta? Regístrate
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-20 gap-3"
        >
          <label className="font-bold">Email</label>
          <input
            type="email"
            placeholder="Escribe tu email"
            {...register("email")}
            className="border-white border-2 rounded px-3 py-2 bg-[#264BEB] text-white placeholder-white w-[350px]"
          />

          <label className="font-bold">Contraseña</label>
          <input
            type="password"
            placeholder="Escribe tu contraseña"
            {...register("password")}
            className="border-white border-2 rounded px-3 py-2 bg-[#264BEB] text-white placeholder-white w-[350px]"
          />

          <button
            type="submit"
            className="border-white border-2 bg-transparent py-2 px-4 rounded text-left w-[103px]"
          >
            Entrar
          </button>
        </form>
      </div>

      <div className="flex-1">
        <img
          src="./image-login.jpeg"
          alt="Restaurant"
          className="rounded-lg"
        ></img>
      </div>
    </main>
  );
}
