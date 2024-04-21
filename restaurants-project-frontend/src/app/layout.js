import { Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "./context/ReactQueryClientProvider";
import { AuthProvider } from "./context/AuthProvider";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Mapa interactivo de restaurantes",
  description:
    "Explora los mejores restaurantes alrededor del parque del Retiro de Madrid.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <ReactQueryClientProvider>
          <AuthProvider>
            {children}
            <footer className="font-normal text-base m-4">
              Prueba técnica ©Tailor hub SL 2019 - 2024
            </footer>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
