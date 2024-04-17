"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { postLogin } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const {
    control,
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationKey: "login",
    mutationFn: postLogin,
    onSuccess: () => {
      console.log("Entra en onSuccess");
      router.push("/map/create");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      mutate(data);
    } catch (error) {
      console.error("Error during onSubmit function:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-row gap-10 p-10 items-end">
      <div className="flex-1 bg-[#264BEB] text-white rounded-lg p-4">
        <img src="/white-logo.svg" alt="Logo" className="w-[194px] h-[44px]" />
        <Link href="/signin">¿No tienes una cuenta? Regístrate</Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-20 gap-3"
        >
          <label className="font-bold">Email</label>
          <input
            type="email"
            placeholder="Escribe tu email"
            {...register("email")}
            className="border-white border-2 rounded px-3 py-2 bg-[#264BEB] text-white"
          />

          <label className="font-bold">Contraseña</label>
          <input
            type="password"
            placeholder="Escribe tu contraseña"
            {...register("password")}
            className="border-white border-2 rounded px-3 py-2 bg-[#264BEB] text-white"
          />

          <button
            type="submit"
            className="border-white border-2 bg-transparent py-2 px-4 rounded text-left w-40"
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
