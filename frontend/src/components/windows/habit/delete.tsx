'use client';

import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import Window, { WindowFooter, WindowSpacer } from "@/components/ui/window";
import { HabitT } from "@/lib/api/models";
import { useDeleteHabitMutation } from "@/lib/mutations/habit/delete";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function DeleteHabitWindow({ visible, setVisible, habit }: { visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>, habit: HabitT }) {
    const { mutate, isIdle } = useDeleteHabitMutation(habit.habitId);

    return (
        <Window visible={visible} title="Delete Habit" Icon={Trash}>
            <WindowSpacer>
                <Text>Are you sure you want to delete this habit? This cannot be undone!</Text>
            </WindowSpacer>
            <WindowSpacer>
                <WindowFooter>
                    <Button title="Cancel" valid={true} cn="bg-bg-medium text-fg-dark" onClick={() => {
                        setVisible(false);
                    }} />
                    <Button title="Delete" valid={isIdle} cn="bg-red-600 text-fg-accent" onClick={async () => {
                        mutate();
                    }} />
                </WindowFooter>
            </WindowSpacer>
        </Window>
    )
}