import Button from "@/components/ui/button";
import TextBox from "@/components/ui/textbox";
import Window, { WindowFooter, WindowFooterStart, WindowSpacer } from "@/components/ui/window";
import { HabitT } from "@/lib/api/models";
import { MaxHabitCategoryLength, MaxHabitNameLength } from "@/lib/api/values";
import { useEditHabitMutation } from "@/lib/mutations/habit/edit";
import { Pencil, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import DeleteHabitWindow from "./delete";

export default function EditHabitWindow({ visible, setVisible, habit }: { visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>, habit: HabitT }) {
    const { mutate } = useEditHabitMutation(habit.habitId);

    const [habitName, setHabitName] = useState<string>(habit.habitName);
    const [habitNameValid, setHabitNameValid] = useState<boolean>();

    const [category, setCategory] = useState<string>(habit.category);
    const [categoryValid, setCategoryValid] = useState<boolean>();

    const valid = habitNameValid && categoryValid;

    const [deleteWindowVisible, setDeleteWindowVisible] = useState<boolean>(false);

    return (
        <>
            <Window visible={visible} title="Edit Habit" Icon={Pencil}>
                <WindowSpacer>
                    <TextBox value={habitName} setValue={setHabitName} maxChars={MaxHabitNameLength} multiline={false} setValid={setHabitNameValid} title="Habit Name" placeholder="Habit name..." />
                </WindowSpacer>
                <WindowSpacer>
                    <TextBox value={category} setValue={setCategory} maxChars={MaxHabitCategoryLength} multiline={true} optional setValid={setCategoryValid} title="Category" placeholder="Habit category..." />
                </WindowSpacer>
                <WindowSpacer>
                    <WindowFooter>
                        <WindowFooterStart>
                            <button onClick={() => {
                                setVisible(false);
                                setDeleteWindowVisible(true);
                                setHabitName(habit.habitName);
                                setCategory(habit.category);
                            }}>
                                <div className="flex items-center gap-1 text-red-600">
                                    <Trash width={15} height={15} />
                                    <p className="text-sm ">Delete</p>
                                </div>
                            </button>
                        </WindowFooterStart>
                        <Button title="Cancel" valid={true} cn="bg-bg-medium text-fg-dark" onClick={() => {
                            setVisible(false);
                            setHabitName(habit.habitName);
                            setCategory(habit.category);
                        }} />
                        <Button title="Save" valid={valid} cn="bg-bg-accent text-fg-accent" onClick={() => {
                            mutate({
                                habitName: habitName,
                                frequency: 1,
                                category: category,
                            });
                            setVisible(false);
                        }} />
                    </WindowFooter>
                </WindowSpacer>
            </Window>
            <DeleteHabitWindow visible={deleteWindowVisible} setVisible={setDeleteWindowVisible} habit={habit} />
        </>
    )
}