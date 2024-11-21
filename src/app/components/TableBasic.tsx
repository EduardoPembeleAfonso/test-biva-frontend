"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/http/getUsers";
import { USER_TYPES } from "@/utils/enums/userTypes.enum";
import IUser from "@/utils/interface/user.interfaces";
import { useQuery } from "@tanstack/react-query";
import { User2 } from "lucide-react";

export function DataTable() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60,
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-medium tracking-wide">
              Usuários
            </TableHead>
            <TableHead className="text-right font-medium tracking-wide">
              Tipo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ?.map((row: IUser) => (
              <TableRow key={row.id} className="">
                <TableCell className="font-medium flex gap-2">
                  <span className="bg-primaryColor w-10 h-10 flex justify-center items-center rounded-xl">
                    <User2 className="size-5 text-white" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-gray-600">{row.name}</span>
                    <span className="text-xs">{row.email}</span>
                  </div>
                </TableCell>
                <TableCell
                  className={`
              text-right font-bold
              ${row.type === USER_TYPES.OWNER ? "text-gray-400" : "text-rose-600"}
              `}
                >
                  {row.type === USER_TYPES.OWNER ? "Proprietário" : "Inquilino"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {data === undefined && (
        <div className="w-full flex justify-center py-10">
          <span className="text-gray-400 text-lg text-center">
            Nenhum usuario encontrado!
          </span>
        </div>
      )}
    </>
  );
}
