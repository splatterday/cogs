import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/main.scss";
import { Header } from "@/components/Header/Header";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Cogs App",
  description: "Generated by create next app",
};

export default async function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie?.value ?? "light";
  
  return (
    <AppProvider>
      <html lang="en" className={theme}>
        <head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </head>
        <body className="bg-background text-text dark:bg-background-dark dark:text-text-dark">
          <header>
            <Header />
          </header>
          <main className="p-6">
            {children}
          </main>
        </body>
      </html>
    </AppProvider>
  );
}

