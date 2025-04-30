import Button from "@/components/ui/button";
import TextBox from "@/components/ui/textbox";
import Window, { WindowFooter, WindowFooterStart, WindowSpacer } from "@/components/ui/window";
import { UserT } from "@/lib/api/models";
import { MaxUserNameLength } from "@/lib/api/values";
import { useEditUserMutation } from "@/lib/mutations/user/edit";
import { LogOut, Settings } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function EditUserWindow({ visible, setVisible, user }: { visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>, user: UserT }) {
    const { mutate } = useEditUserMutation();

    const [username, setUsername] = useState<string>(user.username);
    const [usernameValid, setUsernameValid] = useState<boolean>();

    const valid = usernameValid;

    return (
        <Window visible={visible} title="Edit Profile" Icon={Settings}>
            <WindowSpacer>
                <TextBox value={username} setValue={setUsername} maxChars={MaxUserNameLength} multiline={false} setValid={setUsernameValid} title="Name" placeholder="Name..." />
            </WindowSpacer>
            <WindowSpacer>
                <WindowFooter>
                    <WindowFooterStart>
                        <button onClick={() => { }}>
                            <div className="flex items-center gap-1 text-red-600">
                                <LogOut width={15} height={15} />
                                <p className="text-sm ">Log out</p>
                            </div>
                        </button>
                    </WindowFooterStart>
                    <Button title="Cancel" valid={true} cn="bg-bg-medium text-fg-dark" onClick={() => {
                        setVisible(false);
                        setUsername(user.username);
                    }} />
                    <Button title="Save" valid={valid} cn="bg-bg-accent text-fg-accent" onClick={() => {
                        mutate({
                            username: username
                        });
                        setVisible(false);
                    }} />
                </WindowFooter>
            </WindowSpacer>
        </Window >
    )
}