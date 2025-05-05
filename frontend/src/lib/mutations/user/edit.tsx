import { EditUserRequestT } from "@/lib/api/models";
import { useMutation } from "@tanstack/react-query";
import { editUserAction } from "./actions";

export const editUserKey = () => ['edit_user'];

export const useEditUserMutation = () => {
    //const router = useRouter();

    return useMutation({
        mutationFn: (vars: EditUserRequestT) => editUserAction(vars),
        mutationKey: editUserKey(),
        /*onSuccess: () => {
            router.refresh();
        }*/
    })
};