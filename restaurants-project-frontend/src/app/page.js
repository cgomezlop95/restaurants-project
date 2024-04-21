"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowWelcomeScreen(false);
  };

  return (
    <main className="min-h-screen p-10">
      {showWelcomeScreen && (
        <div
          className="bg-[#F1F1F0] rounded-lg p-4 fixed inset-0 m-10 flex items-center justify-center"
          onClick={handleClick}
        >
          <img
            src="/black-logo.svg"
            alt="Logo"
            className="w-[194px] h-[44px]"
          />
        </div>
      )}

      {!showWelcomeScreen && (
        <div className="flex gap-10 items-end">
          <div className="flex flex-col gap-10 flex-1 bg-[#F1F1F0] rounded-lg p-4 max-h-[50vh]">
            <img
              src="/black-logo.svg"
              alt="Logo"
              className="w-[194px] h-[44px]"
            />
            <p className="text-lg leading-custom-tight">
              Hola,<br></br>Bienvenido a la prueba de Tailor hub, en ella has de
              añadir los restaurantes favoritos donde te gustaría ir en tu
              onboarding.
            </p>

            <Link
              href="/signin"
              className="border border-black px-4 py-2 rounded font-bold w-[132px] text-center"
            >
              Entrar
            </Link>
          </div>

          <div className="flex-1">
            <img
              src="./image-home.jpeg"
              alt="Restaurant"
              className="rounded-lg"
            ></img>
          </div>
        </div>
      )}
    </main>
  );
}
