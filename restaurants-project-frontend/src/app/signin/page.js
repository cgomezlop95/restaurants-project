"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postRegister } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const { mutate } = useMutation({
    mutationKey: "signin",
    mutationFn: postRegister,
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = async (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.error("Error during onSubmit function:", error);
    }
  };

  const handleButton = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.push("/");
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
        <Link href="/login" className="hover:font-bold">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-20 gap-5"
        >
          <button
            type="button"
            className="border border-white bg-transparent py-2 px-4 rounded w-[72px] text-center"
            onClick={handleBack}
          >
            <img
              src="/arrow-left.svg"
              alt="Logo"
              className="w-[28px] h-[28px]"
            />
          </button>

          {step === 1 && (
            <>
              <label className="font-bold">Email:</label>
              <input
                type="email"
                placeholder="Añade tu email"
                {...register("email", { required: true })}
                className="border border-white rounded px-3 py-2 bg-[#264BEB] text-white placeholder-white w-[350px]"
              />

              <label className="font-bold">Nombre de usuario:</label>
              <input
                type="text"
                placeholder="Añade tu nombre"
                {...register("username", { required: true })}
                className="border border-white rounded px-3 py-2 bg-[#264BEB] text-white placeholder-white w-[350px]"
              />
            </>
          )}

          {step === 2 && (
            <>
              <label className="font-bold">Crea una contraseña nueva</label>
              <input
                type="password"
                placeholder="Añade una contraseña"
                {...register("password", { required: true })}
                className="border border-white rounded px-3 py-2 bg-[#264BEB] text-white placeholder-white w-[350px]"
              />
            </>
          )}

          <button
            type="submit"
            onClick={handleButton}
            className="border border-white bg-transparent py-2 px-4 rounded text-left w-[103px]"
          >
            {step === 1 ? "Siguiente" : "Finalizar"}
          </button>
        </form>
      </div>

      <div className="flex-1">
        <img
          src="./image-signup.jpeg"
          alt="Restaurant"
          className="rounded-lg"
        ></img>
      </div>
    </main>
  );
}
