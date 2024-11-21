"use client"
import Header from "@/app/components/Header";
import { DataTable } from "@/app/components/TableBasic";
import { useAuth } from "@/app/contexts/ContextProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const { authState } = useAuth()

  useEffect(() => {
    if (!authState?.authenticated) {
      return router.replace("/sign-in")
    }
  }, [])
  
  
  return (
    <main className="w-full flex-1 flex flex-col gap-10">
      <Header title={"Dashboard"} />

      <div className="bg-white w-full p-10 rounded-xl flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-600 tracking-wide">
            Novos Usuários
          </h2>
        </div>

        <div className="mt-8 w-full">
          <DataTable />
        </div>
      </div>
    </main>
  );
}
