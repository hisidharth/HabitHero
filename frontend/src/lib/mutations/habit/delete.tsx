import { useMutation } from "@tanstack/react-query";
import { deleteHabitAction } from "./actions";

export const deleteHabitKey = (habitId: number) => ['delete_habit', habitId];

export const useDeleteHabitMutation = (habitId: number) => {
    //const router = useRouter();

    return useMutation({
        mutationFn: () => deleteHabitAction(habitId),
        mutationKey: deleteHabitKey(habitId),
        /*onSuccess: () => {
            router.push('/home');
        }*/
    });
}