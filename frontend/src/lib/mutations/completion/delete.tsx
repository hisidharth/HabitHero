import { useMutation } from "@tanstack/react-query";
import { deleteCompletionAction } from "./actions";

export const deleteCompletionKey = (habitId: number, completionId: number) => ['delete_completion', habitId, completionId];

export const useDeleteCompletionMutation = (habitId: number, completionId: number) => {
    //const router = useRouter();

    return useMutation({
        mutationFn: () => deleteCompletionAction(habitId, completionId),
        mutationKey: deleteCompletionKey(habitId, completionId),
        /*onSuccess: () => {
            router.push('/home');
        }*/
    });
}