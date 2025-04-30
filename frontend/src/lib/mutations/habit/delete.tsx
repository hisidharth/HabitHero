import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteHabitAction } from "./actions";

export const deleteHabitKey = (habitId: number) => ['delete_habit', habitId];

export const useDeleteDeviceMutation = (habitId: number) => {
    const router = useRouter();

    return useMutation({
        mutationFn: () => deleteHabitAction(habitId),
        mutationKey: deleteHabitKey(habitId),
        onSuccess: () => {
            router.refresh();
        }
    });
}