"use client";
import React, { useState } from "react";
import { clearCookie } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { mutate } = useMutation({
    mutationKey: "logout",
    mutationFn: clearCookie,
    onSuccess: () => {
      console.log("Cookie has been cleared");
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
          Nombre usuario
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
        <div className="w-48 rounded-md bg-[#264BEB] text-white ">
          <ul className="m-6">
            <li>
              <Link href="/map">Panel de control</Link>
            </li>
            <li>
              <Link href="/map/create">Añadir restaurante</Link>
            </li>
            <hr></hr>
            <li>
              <button className="border-white " onClick={mutate}>
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
