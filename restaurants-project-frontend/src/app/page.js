import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row gap-10 p-10">
      <div className="flex-1 bg-[#F1F1F0] rounded-lg p-4">
        <img src="/black-logo.svg" alt="Logo" className="w-[194px] h-[44px]" />
        <p className="text-custom-large leading-custom-tight">
          Hola,<br></br>Bienvenido a la prueba de Tailor hub, en ella has de
          añadir los restaurantes favoritos donde te gustaría ir en tu
          onboarding.
        </p>

        <Link href="/signin">Entrar</Link>
      </div>

      <div className="flex-1">
        <img
          src="./image-home.jpeg"
          alt="Restaurant"
          className="rounded-lg"
        ></img>
      </div>
    </main>
  );
}
