import Button from "@/components/ui/button";
import NumberBox from "@/components/ui/numberbox";
import TextBox from "@/components/ui/textbox";
import Window, { WindowFooter, WindowSpacer } from "@/components/ui/window";
import { MaxHabitCategoryLength, MaxHabitNameLength } from "@/lib/api/values";
import { useCreateHabitMutation } from "@/lib/mutations/habit/create";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function CreateHabitWindow({ visible, setVisible }: { visible: boolean, setVisible: Dispatch<SetStateAction<boolean>> }) {
    const { mutate } = useCreateHabitMutation();

    const [habitName, setHabitName] = useState<string>('');
    const [habitNameValid, setHabitNameValid] = useState<boolean>();

    const [category, setCategory] = useState<string>('');
    const [categoryValid, setCategoryValid] = useState<boolean>();

    const [frequency, setFrequency] = useState<number>(1);
    const [frequencyValid, setFrequencyValid] = useState<boolean>();


    const valid = habitNameValid && categoryValid && frequencyValid;

    return (
        <Window visible={visible} title="Create Habit" Icon={Plus}>
            <WindowSpacer>
                <TextBox value={habitName} setValue={setHabitName} maxChars={MaxHabitNameLength} multiline={false} setValid={setHabitNameValid} title="Habit Name" placeholder="Habit name..." />
            </WindowSpacer>
            <WindowSpacer>
                <TextBox value={category} setValue={setCategory} maxChars={MaxHabitCategoryLength} multiline={true} optional setValid={setCategoryValid} title="Category" placeholder="Habit category..." />
            </WindowSpacer>
            <WindowSpacer>
                <NumberBox value={frequency} setValue={setFrequency} setValid={setFrequencyValid} min={1} max={100} title="Times per Week" />
            </WindowSpacer>
            <WindowSpacer>
                <WindowFooter>
                    <Button title="Cancel" valid={true} cn="bg-bg-medium text-fg-dark" onClick={() => {
                        setVisible(false);
                        setHabitName('');
                        setCategory('');
                    }} />
                    <Button title="Create" valid={valid} cn="bg-bg-accent text-fg-accent" onClick={() => {
                        mutate({
                            habitName: habitName,
                            frequency: frequency,
                            category: category,
                        });
                        setVisible(false);
                        setHabitName('');
                        setCategory('');
                        setFrequency(1);
                    }} />
                </WindowFooter>
            </WindowSpacer>
        </Window>
    )
}