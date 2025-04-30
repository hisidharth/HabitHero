import { CreateHabitRequestT } from "@/lib/api/models";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createHabitAction } from "./actions";

export const createHabitKey = () => ['create_habit'];

export const useCreateHabitMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (vars: CreateHabitRequestT) => createHabitAction(vars),
        mutationKey: createHabitKey(),
        onSuccess: () => {
            router.refresh();
        }
    })
};