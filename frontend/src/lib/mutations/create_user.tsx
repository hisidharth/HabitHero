import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateUserRequestT } from "../api/models";
import { createUserAction } from "./actions";

export const createUserKey = () => ['create_user'];

export const useCreateUserMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (vars: CreateUserRequestT) => createUserAction(vars),
        mutationKey: createUserKey(),
        onSuccess: () => {
            router.refresh();
        }
    })
};