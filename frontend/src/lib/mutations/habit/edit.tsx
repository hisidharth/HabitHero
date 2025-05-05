import { EditHabitRequestT } from "@/lib/api/models";
import { useMutation } from "@tanstack/react-query";
import { editHabitAction } from "./actions";

export const editHabitKey = () => ['edit_habit'];

export const useEditHabitMutation = (habitId: number) => {
    //const router = useRouter();

    return useMutation({
        mutationFn: (vars: EditHabitRequestT) => editHabitAction(habitId, vars),
        mutationKey: editHabitKey(),
        /*onSuccess: () => {
            router.refresh();
        }*/
    })
};