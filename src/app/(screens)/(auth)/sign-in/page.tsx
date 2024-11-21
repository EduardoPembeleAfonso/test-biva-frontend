/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState, type FormEvent, } from "react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

import { useAuth } from "../../../contexts/ContextProvider";
export default function Home() {
  const router = useRouter()
  const { onLogin } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (email === undefined) {
      setIsLoading(false)
      toast("Email is undefined!");
      return;
    }

    if (password === undefined) {
      setIsLoading(false)
      toast("Password is undefined!");
      return;
    }

    await onLogin(email, password);
    setIsLoading(false)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 justify-center items-center ">
        <div className="max-w-[450px] w-full">
          <h2 className="text-xl font-bold text-primary">Entrar</h2>
          <span className="">Insira seu email e senha para fazer login</span>

          <form onSubmit={onSubmit} className="space-y-6 mt-5">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="exemplo@email.com"
                disabled={false}
                autoCapitalize="off"
                autoComplete="off"
                className="h-[50px] w-full rounded-2xl pl-4 pr-2 placeholder-zinc-300 bg-transparent border border-gray-400 outline-primary transition-all disabled:cursor-not-allowed"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="email">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                disabled={false}
                autoCapitalize="off"
                autoComplete="off"
                className="h-[50px] w-full rounded-2xl pl-4 pr-2 placeholder-zinc-300 bg-transparent border border-gray-400 outline-primary transition-all disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary w-full h-[45px] rounded-2xl text-gray-50 hover:bg-violet-950 active:scale-[.98] transition-all"
            >
              Entrar
            </button>
          </form>
        </div>
        <span className="text-sm">Ou</span>
        <button onClick={() => router.replace('/sign-up')} className="bg-primary w-full h-[45px] rounded-2xl text-gray-50 hover:bg-violet-950 active:scale-[.98] transition-all">
          Se Registra
        </button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span className="text-gray-400 text-sm leading-relaxed">
          Feito com ❤️ pela{" "}
          <Link
            href={"/"}
            className="text-primary ml-1 hover:underline transition-all"
          >
            Biva
          </Link>
        </span>
      </footer>
    </div>
  );
}
