"use client";
import { LogOut } from "lucide-react";

import { useAuth } from "../contexts/ContextProvider";
import Avatar from "./avatar";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { authState, onLogout } = useAuth();
  const admin = authState?.author;

  return (
    <header className="relative bg-primaryColor w-full flex justify-between items-center rounded-xl py-5 px-6">
      <div className="flex items-center gap-4">
        <span className="text-gray-50 text-xl lg:text-2xl font-semibold">
          Pages / <span className="font-normal text-gray-400">{title}</span>
        </span>
      </div>

      <div className="flex gap-16 items-center">
        <div className="flex items-center gap-2">
          <span className="text-gray-100 text-sm lg:text-base">
            {admin?.name}
          </span>
          <div className="border border-white rounded-full">
            <Avatar
              fallback={admin?.name ?? ""}
              image=""
              height="44px"
              width="44px"
            />
          </div>
          <button
        type="button"
        onClick={onLogout}
        className={`
        flex gap-1 rounded-2xl items-center w-30 h-12 px-4 font-medium active:scale-95 transition-all bg-gray-50 text-primaryColor hover:bg-violet-100
        `}
      >
        <span
          className={`
        w-[30px] h-[30px] rounded-2xl flex justify-center items-center bg-primaryColor text-gray-100  
        `}
        >
          <LogOut className="size-4" />
        </span>
        Sair
      </button>
        </div>
      </div>
      
    </header>
  );
}
