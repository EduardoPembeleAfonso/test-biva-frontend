import { Api, authorId } from "@/app/api/Axios";
import type IUser from "@/utils/interface/user.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function getUserById(): Promise<IUser | null> {
  try {
    if (authorId) {
      const response = await Api.get(`/user/${authorId}`);
      const user: IUser = response.data;
      return user;
    }
    return null;
  } catch {
    toast("Houve uma falha ao buscar o usuario!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
