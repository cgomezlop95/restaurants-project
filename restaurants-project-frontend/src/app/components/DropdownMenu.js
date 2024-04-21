"use client";
import React, { useState } from "react";
import { clearCookie } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../app/hooks/useAuth";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  let auth = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { mutate } = useMutation({
    mutationKey: "logout",
    mutationFn: clearCookie,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Error deleting the cookie", error);
    },
  });

  return (
    <div className="relative inline-block text-right">
      <div>
        <button onClick={toggleMenu} className="flex flex-row">
          Nombre usuario: {auth.currentUser.username}
          {isOpen ? (
            <img src="/arrow-up.svg" alt="Logo" className="w-[24px] h-[24px]" />
          ) : (
            <img
              src="/arrow-down.svg"
              alt="Logo"
              className="w-[24px] h-[24px]"
            />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 w-48 rounded-md bg-[#264BEB] text-white m-1">
          <ul className="p-3">
            <li>
              <Link href="/map">Panel de control</Link>
            </li>
            <li>
              <Link href="/map/create">Añadir restaurante</Link>
            </li>
            <li>
              <Link href="/map/favourites">Ver Favoritos</Link>
            </li>
            <hr className="m-1"></hr>
            <li>
              <button
                className="border border-white px-4 py-2 rounded font-bold w-[132px] text-center m-4"
                onClick={mutate}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
