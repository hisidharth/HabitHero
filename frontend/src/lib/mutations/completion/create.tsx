import { CreateCompletionRequestT } from "@/lib/api/models";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCompletionAction } from "./actions";

export const createCompletionKey = () => ['create_completion'];

export const useCreateCompletionMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (vars: CreateCompletionRequestT) => createCompletionAction(vars),
        mutationKey: createCompletionKey(),
        onSuccess: () => {
            router.refresh();
        }
    })
};