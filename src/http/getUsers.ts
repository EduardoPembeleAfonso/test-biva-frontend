import { Api, authorId } from "@/app/api/Axios";
import type IUser from "@/utils/interface/user.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function getUsers(): Promise<IUser[]> {
  try {
    if (authorId) {
      const response = await Api.get(`/users/${authorId}`);
      const users: IUser[] = response.data;
      return users;
    }
    return [];
  } catch {
    toast("Houve uma falha ao buscar os usuarios!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return [];
  }
}
